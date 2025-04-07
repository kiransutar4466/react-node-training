import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'
import authSlice from '../pages/login/authSlice'
import registerSlice from '../pages/registration/registerSlice'
import createEventSlice from '../component/createEventForm/createEventSlice'
import eventDetailsFetchSlice from '../component/createEventForm/eventDetailsFetchSlice '
import getAllDetailsSlice from '../pages/displayAllEvents/getAllDetailsSlice'
import updateEventSlice from '../component/createEventForm/updateEventSlice'
import showsSlice from '../pages/shows/showsSlice'
import bookSeatsSlice from '../pages/shows/bookSeatsSlice'
import userTicketSlice from '../component/userTickets/userTicketSlice'
import sidebarReducer from '../component/sideBar/sidebarSlice'
import dashboardSlice from '../pages/adminDashboard/dashboardSlice'
import reviewSlice from '../pages/viewMoreEventDetails/reviews/reviewSlice'
const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
    reducer: {
        auth: authSlice,
        register: registerSlice,
        createEvent: createEventSlice,
        eventById:eventDetailsFetchSlice,
        getAllEvents:getAllDetailsSlice,
        updateEvent:updateEventSlice,
        shows:showsSlice,
        bookSeats:bookSeatsSlice,
        userTickets:userTicketSlice,
        sidebar: sidebarReducer,
        dashboard:dashboardSlice,
        reviews:reviewSlice

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>;
export default store