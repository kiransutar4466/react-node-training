import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import navSlice from "./navSlice"
import authSlice from "../pages/login-page/authSlice"
import productSlice from "../pages/product-list-page/productSlice";
import vendorSlice from "../pages/manage-vendors-page/vendorSlice";
import cartSlice from "../pages/cart-page/cartSlice"
import inventorySlice from "../pages/inventory-page/inventorySlice"
import lowStocksSaga from "../pages/low-stocks-page/lowStocksSlice"
import ordersSlice from "../pages/orders-page/ordersSlice"

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    navs:navSlice,
    auth:authSlice,
    product:productSlice,
    vendor:vendorSlice,
    cart:cartSlice,
    inventory:inventorySlice,
    lowStocks:lowStocksSaga,
    orders:ordersSlice
  },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type rootState = ReturnType<typeof store.getState>;

export default store;
