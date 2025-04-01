import { all } from 'redux-saga/effects'
import wahtchLogin from '../pages/login/authSaga'
import watchRegisterUser from '../pages/registration/registerSaga'
import { watchCreateEvent, watchDeleteEvent, watchGetEventById } from '../component/createEventForm/createEventSaga'
import { watchGetAllEvents } from '../pages/displayAllEvents/getAllEventsSaga'
import { watchUpdateEvent } from '../component/createEventForm/updateEventSaga'
import  {watchFetchShowById, watchFetchSeats } from '../pages/shows/showsSaga'

export default function* rootSaga() {
   yield all([wahtchLogin(), watchRegisterUser(), watchCreateEvent(), watchGetEventById(), watchDeleteEvent(), watchGetAllEvents(), watchUpdateEvent(), watchFetchShowById(), watchFetchSeats()])
}