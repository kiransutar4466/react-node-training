import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchCurrentProductsFailure,
  fetchCurrentProductsStart,
  fetchCurrentProductsSuccess,
} from "../slices/currentProductSlice";
import { productType } from "../../types/productsTypes";
import axios from "axios";
import { FETCH_CURRENT_PRODUCTS } from "../constants";

function* fetchCurrentProductSaga(action: { payload: number }) {
  try {
    yield put(fetchCurrentProductsStart());
    console.log("inside saga try block");
    const response: { data: productType } = yield call(
      axios.get,
      `${import.meta.env.VITE_STORE_API_BASE_URL}products/${action.payload}`
    );

    yield put(fetchCurrentProductsSuccess(response.data));
  } catch (error: any) {
    console.log("inside saga catch block");
    yield put(fetchCurrentProductsFailure(error.message));
  }
}

function* watchFetchCurrentProducts() {
  console.log("inside saga watcher");
  yield takeLatest(FETCH_CURRENT_PRODUCTS, fetchCurrentProductSaga);
}

export default watchFetchCurrentProducts;
