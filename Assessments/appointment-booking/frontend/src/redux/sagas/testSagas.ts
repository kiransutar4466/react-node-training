import { call, put, takeLatest } from "redux-saga/effects";
import { getData, getUserErrorAction, isloading } from "../slices/Test";
import axios from "axios";
const fetchUserData = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  console.log(response);

  return await response.data;
};
function* getUserSaga({ payload: data }) {
  try {
    // Await API response
    yield put(isloading());
    const response = yield call(fetchUserData);
    yield put(getData(response)); // Update Redux state
  } catch (error) {
    yield put(getUserErrorAction(error.message || "An error occurred"));
  }
}

// Watcher saga
export function* watchGetUser() {
  yield takeLatest("test/getData/action", getUserSaga);
}
