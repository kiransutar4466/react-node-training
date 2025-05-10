import { all } from "redux-saga/effects";
import watchFetchProducts from "./productsSaga";
import watchFetchCurrentProduct from "./currentProductSaga";
import watchPostUser from "./postUserSaga";
import watchAuth from "./authSaga";

export default function* rootSaga() {
  yield all([
    watchFetchProducts(),
    watchFetchCurrentProduct(),
    watchPostUser(),
    watchAuth(),
  ]);
}
