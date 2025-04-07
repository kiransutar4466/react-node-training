import { put, takeEvery } from "redux-saga/effects";
import {
  failInventoryApiRequest,
  startInventoryApiRequest,
  successEditInventory,
  successFetchAllInventories,
  successFetchInventoryById,
} from "./inventorySlice";
import {
  getAllInventoryService,
  getInventoryByIdService,
  putInventoryByIdService,
} from "../../services/inventoryServices";
import {
  EDIT_INVENTORY,
  FETCH_ALL_INVENTORIES,
  FETCH_INVENTORY_BY_ID,
} from "../../constants/actionTypesConstants";

export const fetchAllInventories = (payload: {
  page: number;
  perPage: number;
  search: string;
}) => {
  return { type: FETCH_ALL_INVENTORIES, payload };
};

export const fetchInventoryById = (payload: string) => {
  return { type: FETCH_INVENTORY_BY_ID, payload };
};

export const patchInventory = (payload: { id: string; formData: {} }) => {
  return { type: EDIT_INVENTORY, payload };
};

function* getAllInventories(action: {
  type: string;
  payload: { page: number; perPage: number; search: string };
}) {
  yield put(startInventoryApiRequest());

  const response: { data?: any; status: number; error?: string } =
    yield getAllInventoryService(action.payload);

  if (response.data && response.status == 200) {
    yield put(successFetchAllInventories(response.data));
  } else {
    yield put(failInventoryApiRequest(response.error));
  }
}

function* getInventoryById(action: { type: string; payload: string }) {
  yield put(startInventoryApiRequest());

  const response: { data?: any; status?: number; error?: string } =
    yield getInventoryByIdService(action.payload);

  if (response.data && response.status == 200) {
    yield put(successFetchInventoryById(response.data));
  } else {
    yield put(failInventoryApiRequest(response));
  }
}

function* editInventory(action: {
  type: string;
  payload: { id: string; formData: {} };
}) {
  yield put(startInventoryApiRequest());

  const response: { data?: any; error?: string } =
    yield putInventoryByIdService(action.payload);

  if (response.data) {
    yield put(successEditInventory());
  } else {
    yield put(failInventoryApiRequest(response));
  }
}

function* watchPatchInventory() {
  yield takeEvery(EDIT_INVENTORY, editInventory);
}

function* watchFetchInventroyById() {
  yield takeEvery(FETCH_INVENTORY_BY_ID, getInventoryById);
}

function* watchFetchAllInventories() {
  yield takeEvery(FETCH_ALL_INVENTORIES, getAllInventories);
}

export {
  watchPatchInventory,
  watchFetchInventroyById,
  watchFetchAllInventories,
};
