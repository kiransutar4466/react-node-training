import { put, call, takeLatest } from "redux-saga/effects";
import {
  checkAuthStart,
  checkAuthFaliure,
  checkAuthSuccess,
} from "../slices/authSlice";
import { userType } from "../../types/userTypes";
import axios from "axios";
import { CHECK_AUTH } from "../constants";

function* authenticate(action: any) {
  try {
    yield put(checkAuthStart());

    const response: { data: userType } = yield call(
      axios.post,
      `${import.meta.env.VITE_STORE_API_BASE_URL}auth/login`,
      action.payload
    );

    yield put(
      checkAuthSuccess({ ...response.data, username: action.payload.username })
    );
  } catch (error: any) {
    yield put(checkAuthFaliure(error.message));
  }
}

function* watchAuth() {
  yield takeLatest(CHECK_AUTH, authenticate);
}

export default watchAuth;
