import { put, takeEvery } from "redux-saga/effects";
import {
  failOrdersApiRequest,
  startOrdersApiRequest,
  successAddOrder,
  successEditOrder,
  successFetchAllOrders,
  successFetchOrderById,
} from "./ordersSlice";
import {
  FETCH_ALL_INVENTORY_ORDERS,
  FETCH_ALL_ORDERS,
  FETCH_ORDER_BY_ID,
  PATCH_INVENTORY_ORDER,
  PATCH_ORDER,
  PLACE_ORDER,
} from "../../constants/actionTypesConstants";
import {
  getAllInventoryOrdersService,
  getAllOrdersService,
  getOrderByIdService,
  patchInventoryOrderService,
  patchOrderService,
  postOrderService,
} from "../../services/ordersServices";

export const fetchAllOrders = (payload: {
  page: number;
  perPage: number;
  search: string;
}) => {
  return { type: FETCH_ALL_ORDERS, payload };
};

export const fetchAllInventoryOrders = (payload: {
  page: number;
  perPage: number;
  search: string;
}) => {
  return { type: FETCH_ALL_INVENTORY_ORDERS, payload };
};

export const placeOrder = (payload: Function) => {
  return { type: PLACE_ORDER, payload };
};

export const fetchOrderById = (payload: string) => {
  return { type: FETCH_ORDER_BY_ID, payload };
};

export const patchOrder = (payload: {
  id: string;
  formData: any;
  dispatchAction: Function;
}) => {
  return { type: PATCH_ORDER, payload };
};

export const patchInventoryOrder = (payload: {
  id: string;
  formData: any;
  dispatchAction: Function;
}) => {
  return { type: PATCH_INVENTORY_ORDER, payload };
};

function* getAllOrders(action: {
  type: string;
  payload: { page: number; perPage: number; search: string };
}) {
  yield put(startOrdersApiRequest());

  const response: { data?: any; status: number; error?: string } =
    yield getAllOrdersService(action.payload);

  if (response.data && response.status == 200) {
    yield put(successFetchAllOrders(response.data));
  } else {
    yield put(failOrdersApiRequest(response));
  }
}

function* getAllOrderById(action: { type: string; payload: string }) {
  yield put(startOrdersApiRequest());

  const response: { data?: any; status: number; error?: string } =
    yield getOrderByIdService(action.payload);

  if (response.data && response.status == 200) {
    yield put(successFetchOrderById(response.data));
  } else {
    yield put(failOrdersApiRequest(response));
  }
}

function* getAllInventoryOrders(action: {
  type: string;
  payload: { page: number; perPage: number; search: string };
}) {
  yield put(startOrdersApiRequest());

  const response: { data?: any; status: number; error?: string } =
    yield getAllInventoryOrdersService(action.payload);

  if (response.data && response.status == 200) {
    yield put(successFetchAllOrders(response.data));
  } else {
    yield put(failOrdersApiRequest(response));
  }
}

function* placeOrderSaga(action: { type: string; payload: Function }) {
  yield put(startOrdersApiRequest());

  const response: { data?: any; status: number; error?: string } =
    yield postOrderService();

  if (response.data && (response.status == 201 || response.status == 200)) {
    yield put(successAddOrder());

    yield action.payload();
  } else {
    yield put(failOrdersApiRequest(response));
  }
}

function* editOrderSaga(action: {
  type: string;
  payload: { id: string; formData: any; dispatchAction: Function };
}) {
  yield put(startOrdersApiRequest());

  const response: { data?: any; status: number; error?: string } =
    yield patchOrderService({
      id: action.payload.id,
      formData: action.payload.formData,
    });

  if (response.data && (response.status == 201 || response.status == 200)) {
    yield put(successEditOrder());

    yield action.payload.dispatchAction();
  } else {
    yield put(failOrdersApiRequest(response));
  }
}

function* editInventoryOrderSaga(action: {
  type: string;
  payload: { id: string; formData: any; dispatchAction: Function };
}) {
  yield put(startOrdersApiRequest());

  const response: { data?: any; status: number; error?: string } =
    yield patchInventoryOrderService({
      id: action.payload.id,
      formData: action.payload.formData,
    });

  if (response.data && (response.status == 201 || response.status == 200)) {
    yield put(successEditOrder());

    yield action.payload.dispatchAction();
  } else {
    yield put(failOrdersApiRequest(response));
  }
}

function* watchPatchOrder() {
  yield takeEvery(PATCH_ORDER, editOrderSaga);
}

function* watchFetchAllOrders() {
  yield takeEvery(FETCH_ALL_ORDERS, getAllOrders);
}

function* watchFetchAllInventoryOrders() {
  yield takeEvery(FETCH_ALL_INVENTORY_ORDERS, getAllInventoryOrders);
}

function* watchPlaceOrder() {
  yield takeEvery(PLACE_ORDER, placeOrderSaga);
}

function* watchFetchOrderById() {
  yield takeEvery(FETCH_ORDER_BY_ID, getAllOrderById);
}

function* watchPatchInventoryOrder() {
  yield takeEvery(PATCH_INVENTORY_ORDER, editInventoryOrderSaga);
}

export {
  watchFetchAllOrders,
  watchFetchAllInventoryOrders,
  watchPlaceOrder,
  watchFetchOrderById,
  watchPatchOrder,
  watchPatchInventoryOrder,
};
