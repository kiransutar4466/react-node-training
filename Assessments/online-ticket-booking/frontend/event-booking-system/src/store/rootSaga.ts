import { all } from 'redux-saga/effects'
import wahtchLogin from '../pages/login/authSaga'
import watchRegisterUser from '../pages/registration/registerSaga'
import { watchCreateEvent, watchDeleteEvent, watchGetEventById } from '../component/createEventForm/createEventSaga'
import { watchGetAllEvents } from '../pages/displayAllEvents/getAllEventsSaga'
import { watchUpdateEvent } from '../component/createEventForm/updateEventSaga'
import  {watchFetchShowById, watchFetchSeats } from '../pages/shows/showsSaga'
import { watchSeatBooking } from '../pages/shows/bookSeatsSaga'
import watchGetUserTickets from '../component/userTickets/userTicketSaga'
import { watchDashboardData } from '../pages/adminDashboard/dashboardSaga'
import  { watchAddReview,watchGetReviews } from '../pages/viewMoreEventDetails/reviews/reviewSaga'

export default function* rootSaga() {
   yield all([wahtchLogin(), watchRegisterUser(), watchCreateEvent(), watchGetEventById(), watchDeleteEvent(),
       watchGetAllEvents(), watchUpdateEvent(), watchFetchShowById(), watchFetchSeats(),watchSeatBooking(),watchGetUserTickets(),watchDashboardData(),watchAddReview(),watchGetReviews()])
}