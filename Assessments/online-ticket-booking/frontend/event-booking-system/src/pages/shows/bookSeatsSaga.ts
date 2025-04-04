import { put, takeLatest } from 'redux-saga/effects'
import { setSeatBookingError, setSeatBookingSuccess, startSeatBookLoading } from './bookSeatsSlice'
import { BOOK_SEATS } from '../../types/types'
import { seatBookingApi } from '../../services/showsService'
import { toast } from 'react-toastify'

export const bookSeats = (payload: any) => {

    return {
        type: BOOK_SEATS,
        payload
    }
}

function* userSeatBooking(action: { type: string, payload: any }) {

    const { userId,
        eventId,
        showId,
        selectedTickets,
        amoutPaid,
        closeModal, navigate } = action.payload
    try {
        yield put(startSeatBookLoading())

        const payload = {
            userId,
            eventId,
            showId,
            selectedTickets,
            amoutPaid,
        }
        const { response } = yield seatBookingApi(payload)

        if (response) {
            toast.success("Tickets Booked SuccessSully")
            navigate('/')
            closeModal()
            yield put(setSeatBookingSuccess(response?.data?.data))
            
        }
    } catch (error: any) {
            yield put(setSeatBookingError(error))
    } finally {
        let data: any = ""
        yield put(setSeatBookingError(data))
    }
}

function* watchSeatBooking() {
    yield takeLatest(BOOK_SEATS, userSeatBooking)
}

export { watchSeatBooking }