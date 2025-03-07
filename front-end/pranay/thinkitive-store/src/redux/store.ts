import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/rootSaga";
import productsReducer from "../redux/slices/productSlice";
import currentPoductReducer from "../redux/slices/currentProductSlice";
import cartReducer from "../redux/slices/cartSlice";
import userReducer from "../redux/slices/userSlice";
import authReducer from "../redux/slices/authSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    currentProduct: currentPoductReducer,
    user: userReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type rootState = ReturnType<typeof store.getState>;

export default store;
