import { put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  DELETE_VENDOR,
  EDIT_VENDOR,
  FETCH_ALL_VENDORS,
  FETCH_VENDOR_BY_ID,
  POST_VENDOR,
} from "../../constants/actionTypesConstants";
import {
  createVendorPayloadType,
  fetchVendorsPayloadType,
} from "../../types/slice-state-types/vendorStateTypes";
import {
  failVendorApiRequest,
  startVendorApiRequest,
  successCreateVendor,
  successDeleteVendorById,
  successEditVendor,
  successFetchAllVendors,
  successFetchVendorById,
} from "./vendorSlice";
import {
  deleteVendorByIdService,
  getAllVendorsService,
  getVendorByIdService,
  patchVendorService,
  postVendorService,
} from "../../services/vendorServices";

export const postVendor = (payload: {
  formData: createVendorPayloadType;
  dispatchAction: Function;
}) => {
  return { type: POST_VENDOR, payload };
};

export const fetchAllVendors = (payload: fetchVendorsPayloadType) => {
  return { type: FETCH_ALL_VENDORS, payload };
};

export const fetchVendorById = (payload: string) => {
  return { type: FETCH_VENDOR_BY_ID, payload };
};

export const patchVendor = (payload: {
  id: string;
  formData: createVendorPayloadType;
  dispatchAction: Function;
}) => {
  return { type: EDIT_VENDOR, payload };
};

export const deleteVendor = (payload: {
  id: string;
  dispatchAction: Function;
}) => {
  return { type: DELETE_VENDOR, payload };
};

function* createVendor(action: {
  type: string;
  payload: { formData: createVendorPayloadType; dispatchAction: Function };
}) {
  yield put(startVendorApiRequest());

  const response: { status: number; error?: string } = yield postVendorService(
    action.payload.formData,
  );

  if (response.status == 200 || response.status == 201) {
    yield put(successCreateVendor());
    yield action.payload.dispatchAction();
  } else {
    yield put(failVendorApiRequest(response));
  }
}

function* getAllVendors(action: {
  type: string;
  payload: fetchVendorsPayloadType;
}) {
  yield put(startVendorApiRequest());

  const response: { data?: any; status?: number; error?: string } =
    yield getAllVendorsService(action.payload);
  console.log(response);
  if (response.data && response.status == 200) {
    yield put(successFetchAllVendors(response.data));
  } else {
    yield put(failVendorApiRequest(response));
  }
}

function* getVendorById(action: { type: string; payload: string }) {
  yield put(startVendorApiRequest());

  const response: { data?: any; error?: string } = yield getVendorByIdService(
    action.payload,
  );

  if (response.data) {
    yield put(successFetchVendorById(response.data));
  } else {
    yield put(failVendorApiRequest(response));
  }
}

function* editVendor(action: {
  type: string;
  payload: {
    id: string;
    formData: createVendorPayloadType;
    dispatchAction: Function;
  };
}) {
  yield put(startVendorApiRequest());

  const response: { data?: any; error?: string } = yield patchVendorService(
    action.payload,
  );

  if (response.data) {
    yield put(successEditVendor(response.data));
    yield action.payload.dispatchAction();
  } else {
    yield put(failVendorApiRequest(response));
  }
}

function* deleteVendorById(action: {
  type: string;
  payload: { id: string; dispatchAction: Function };
}) {
  yield put(startVendorApiRequest());

  const response: { data?: any; status: number; error?: string } =
    yield deleteVendorByIdService(action.payload.id);

  if (response.data && response.status == 200) {
    yield put(successDeleteVendorById(response.data));
    yield action.payload.dispatchAction();
  } else {
    yield put(failVendorApiRequest(response));
  }
}

function* watchDeleteVendor() {
  yield takeEvery(DELETE_VENDOR, deleteVendorById);
}

function* watchPatchVendor() {
  yield takeEvery(EDIT_VENDOR, editVendor);
}

function* watchFetchVendorById() {
  yield takeEvery(FETCH_VENDOR_BY_ID, getVendorById);
}

function* watchFetchAllVendors() {
  yield takeEvery(FETCH_ALL_VENDORS, getAllVendors);
}

function* watchPostVendor() {
  yield takeLatest(POST_VENDOR, createVendor);
}

export {
  watchPostVendor,
  watchDeleteVendor,
  watchPatchVendor,
  watchFetchVendorById,
  watchFetchAllVendors,
};
