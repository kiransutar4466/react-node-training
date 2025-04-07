// src/redux/sagas/reviewSaga.ts
import { put, takeLatest } from 'redux-saga/effects';


import { addReviewFailure, addReviewSuccess, setReviewsData, setReviewsError, startReviewLoading } from './reviewSlice';
import { GET_REVIEW, POST_REVIEW } from '../../../types/types';
import { postReviewApi, getReviewsApi } from '../../../services/reviewsService';
import { toast } from 'react-toastify';

export const postReviews = (payload: any) => {
    return {
        type: POST_REVIEW,
        payload
    }
}
export const getReviews = (payload: any) => {
    return {
        type: GET_REVIEW,
        payload
    }
}


function* addReviewSaga(action: any): any {
    const { userId,
        eventId,
        reviews,
        rating,
        setIsReviewVisiableCB } = action.payload
   
    try {
        const payload = {
            userId,
            eventId,
            reviews,
            rating,
        }
        const { response } = yield postReviewApi(payload)
        if (response?.status == 200 || response?.status == 201) {
            toast.success("Review added successfully")
            yield put(addReviewSuccess(response));
            setIsReviewVisiableCB(false)
        }

    } catch (error: any) {
        yield put(addReviewFailure(error.message));

    }
}
function* getEventReviews(action:any){
    try{
        yield put(startReviewLoading())
        const {response}=yield getReviewsApi(action.payload)
        yield put(setReviewsData(response?.data?.data))
      }catch(error){
        yield put(setReviewsError())
    }
}


function* watchAddReview() {
    yield takeLatest(POST_REVIEW, addReviewSaga);
}

function* watchGetReviews(){
    yield takeLatest(GET_REVIEW,getEventReviews)
}
export {watchAddReview,watchGetReviews}