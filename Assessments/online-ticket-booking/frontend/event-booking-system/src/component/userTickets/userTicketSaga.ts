import { put, takeLatest } from 'redux-saga/effects'
import { GET_USER_TICKETS } from '../../types/types'
import { setTicketError, setTicketsSuccess, startTicketLoading } from './userTicketSlice'
import { getUserTicketApi } from '../../services/userService'

export const getUserTickets = (payload:any) => {

    return {
        type:GET_USER_TICKETS,
        payload
      
    }
}

function* getTickets(action: { type: string, payload: any }) {
    try{
            yield put(startTicketLoading())

            const {response}=yield  getUserTicketApi(action.payload)

            yield put(setTicketsSuccess(response?.data?.data))

    }catch(error:any){
        yield put(setTicketError(error))
    }
}

function* watchGetUserTickets() {
    yield takeLatest(GET_USER_TICKETS, getTickets)
}

export default watchGetUserTickets