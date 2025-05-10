import { call, put, takeLatest } from "redux-saga/effects";
import {
  postUserStart,
  postUserSuccess,
  postUserFailure,
} from "../slices/userSlice";
import axios from "axios";
import { userType } from "../../types/userTypes";
import { POST_USER } from "../constants";

function* postUser(action: { payload: userType }) {
  try {
    yield put(postUserStart());

    const response: { data: userType } = yield call(
      axios.post,
      `${import.meta.env.VITE_STORE_API_BASE_URL}users/`,
      action.payload
    );

    yield put(postUserSuccess(response));
  } catch (error: any) {
    yield put(postUserFailure(error.message));
  }
}

function* watchPostUser() {
  yield takeLatest(POST_USER, postUser);
}

export default watchPostUser;
