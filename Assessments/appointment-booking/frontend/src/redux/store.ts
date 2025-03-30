import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import testReducer from "./slices/Test";
import rootSaga from "./sagas/rootSagas";
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: { test: testReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export default store;
