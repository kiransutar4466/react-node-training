import { put, takeLatest } from 'redux-saga/effects'
import { fetchShowByID, getSeatsApi } from '../../services/showsService';
import { GET_AVAILABLE_SEATS, GET_SHOWS } from '../../types/types';
import { setFetchError, setFetchSeatSuccess, showError, showSuccess, startSeatLoading, startShowsLoading } from './showsSlice';


export const getShowsByid = (payload: any) => {

  return {
    type: GET_SHOWS,
    payload
  }
}
export const getAvailableSeats = (payload: any) => {

  return {
    type: GET_AVAILABLE_SEATS,
    payload
  }
}
function* getShowById(action: { type: string; payload: any }) {

  // const {  eventId, eventShowDate} = action.payload

  try {
    yield put(startShowsLoading());
    const { response } = yield fetchShowByID(action.payload);

    yield put(showSuccess(response?.data?.data));
  } catch (error: any) {

    yield put(showError(error));
  }
}

function* getEventSeats(action: { type: string, payload: any }) {
  const { id,
    setShowSeatBookingModalCB } = action.payload
  try {
    yield put(startSeatLoading())
    const { response } = yield getSeatsApi(id)

    if(response?.status==200&&response?.data)
    {
      yield put(setFetchSeatSuccess(response?.data?.data))
     
      
     
    }
   
    
  } catch (error: any) {
    yield put(setFetchError(error))
  }
}

function* watchFetchSeats() {
  yield takeLatest(GET_AVAILABLE_SEATS, getEventSeats)
}
function* watchFetchShowById() {
  yield takeLatest(GET_SHOWS, getShowById);
}
export { watchFetchShowById, watchFetchSeats }