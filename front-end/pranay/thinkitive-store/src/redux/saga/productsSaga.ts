import { put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";
import { productsStateType } from "../../types/productsTypes";
import {
  fetchProductsFailure,
  fetchProductsSuccess,
  fetchProductsStart,
} from "../slices/productSlice";

import { FETCH_PRODUCTS } from "../constants";

function* fetchProducts() {
  try {
    yield put(fetchProductsStart());

    const response: { data: productsStateType[] } = yield call(
      axios.get,
      `${import.meta.env.VITE_STORE_API_BASE_URL}products`
    );

    yield put(fetchProductsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchProductsFailure(error.message));
  }
}

function* watchFetchProducts() {
  yield takeLatest(FETCH_PRODUCTS, fetchProducts);
}

export default watchFetchProducts;
