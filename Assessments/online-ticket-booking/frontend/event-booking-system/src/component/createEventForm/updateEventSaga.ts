import { put, takeLatest } from "redux-saga/effects";
import { UPDATE_EVENt } from "../../types/types";
import { updateEventFailure, updateEventRequest, updateEventSuccess } from "./updateEventSlice";
import { updateEventApi } from "../../services/eventServices";
import { toast } from "react-toastify";
import { getAllEvents } from "../../pages/displayAllEvents/getAllEventsSaga";


export const upDateEventDate = (payload: any) => {

    return {
        type: UPDATE_EVENt,
        payload
    }

}

function* updateEventSaga(action: any): any {

    try {
        yield put(updateEventRequest())
        const response = yield updateEventApi(action.payload)
        if (response.status === 200 || response.status == 201) {
            toast.success(response?.data?.message)
            
            yield put(updateEventSuccess(response))
            const payload = {
                eventName: "",
                eventCategory: "",
                eventStartDate: "",
                eventEndDate: "",
              };
            yield put(getAllEvents(payload)); 
        }


    } catch (error: any) {
        toast.error(error)
        yield put(updateEventFailure(error.message));
    }
}


export function* watchUpdateEvent() {
    yield takeLatest(UPDATE_EVENt, updateEventSaga);
}
