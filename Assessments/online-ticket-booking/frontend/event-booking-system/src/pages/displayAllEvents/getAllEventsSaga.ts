import { put, takeLatest } from "redux-saga/effects";
import { getAllEventsApi } from "../../services/eventServices"; // API call function
import {
  setGetAllEventsSuccess,
  setGetAllEventsError,
  startLoading,
} from "./getAllDetailsSlice";
import { GET_ALL_EVENTS } from "../../types/types";

export const getAllEvents = (payload: any) => (

  {
    type: GET_ALL_EVENTS,
    payload
  });

function* fetchAllEvents(action: { type: string; payload: any }) {
  try {
    yield put(startLoading());
    const { response } = yield getAllEventsApi(action.payload);
    yield put(setGetAllEventsSuccess(response?.data));
  } catch (error) {
    // toast.error("Failed to fetch events");
    yield put(setGetAllEventsError(error));
  }
}

function* watchGetAllEvents() {
  yield takeLatest(GET_ALL_EVENTS, fetchAllEvents);
}

export { watchGetAllEvents };
