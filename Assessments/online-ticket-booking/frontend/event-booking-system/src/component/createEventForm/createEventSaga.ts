import { put, takeLatest } from 'redux-saga/effects'
import { createEventApi, deleteEventApi, getEventDetailsApi } from '../../services/eventServices'
import { setCreateEventSuccess, setEventCreatinError, startLaoding } from './createEventSlice'
import { CREATE_EVENT, GET_EVENT_BY_ID, DELETE_EVENT } from '../../types/types'
import { toast } from 'react-toastify'
import { setEventDetailsError, setEventDetailsSuccess, startEventLoading } from './eventDetailsFetchSlice '
import { getAllEvents } from '../../pages/displayAllEvents/getAllEventsSaga'

export const createEvent = (payload: any) => {
 
  return {
    type: CREATE_EVENT,
    payload
  }
}

export const getEventById = (payload: any) => {

  return {
    type: GET_EVENT_BY_ID,
    payload,
  };
};


export const deleteEvent = (id: number) => (
  {

    type: DELETE_EVENT,
    payload: id,
  });

function* createNewEvent(action: { type: string, payload: any }) {
  const { data, closeModal } = action.payload

  try {
    yield put(startLaoding())
    const { response } = yield createEventApi(data)
   if (response.status == 200 || response.status == 201) {

      yield put(setCreateEventSuccess(response))
      const payload = {
        eventName: "",
        eventCategory: "",
        eventStartDate: "",
        eventEndDate: "",
      };
      yield put(getAllEvents(payload))
      closeModal('')

      toast.success(response.data.message)

    }



  } catch (error: any) {
    toast.error(error)
    yield put(setEventCreatinError())
  }finally{
    yield put(setEventCreatinError())
  }
}

function* fetchEventById(action: { type: string; payload: any }) {

  const { id,setShowModal } = action.payload

  try {
    yield put(startEventLoading());
    const { response } = yield getEventDetailsApi(id);
  
    setShowModal(true)
    yield put(setEventDetailsSuccess(response?.data?.data));
  } catch (error: any) {
    // toast.error("Failed to fetch event details");
    yield put(setEventDetailsError(error));
  }
}


function* deleteEventById(action: { type: string; payload: any }) {

  try {
    const { response } = yield deleteEventApi(action.payload)
    if (response?.status == 200 || response?.status == 201) {
      toast.success('Event deleted successfully');
      const payload = {
        eventName: "",
        eventCategory: "",
        eventStartDate: "",
        eventEndDate: "",
      };
      yield put(getAllEvents(payload))
    }

  } catch (error: any) {

    toast.error('Failed to delete event');
  }
}

function* watchDeleteEvent() {
  yield takeLatest(DELETE_EVENT, deleteEventById);
}
function* watchCreateEvent() {
  yield takeLatest(CREATE_EVENT, createNewEvent)
}

function* watchGetEventById() {
  yield takeLatest(GET_EVENT_BY_ID, fetchEventById);
}

export { watchCreateEvent, watchGetEventById, watchDeleteEvent };