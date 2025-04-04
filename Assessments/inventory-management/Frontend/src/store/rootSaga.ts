import { all } from "redux-saga/effects";
import watchAuthUser from "../pages/login-page/authSaga";
import {
  watchAddProduct,
  watchDeleteProduct,
  watchFetchAllCategories,
  watchFetchAllProducts,
  watchFetchProductById,
  watchPatchProduct,
} from "../pages/product-list-page/productSaga";
import {
  watchDeleteVendor,
  watchFetchAllVendors,
  watchFetchVendorById,
  watchPatchVendor,
  watchPostVendor,
} from "../pages/manage-vendors-page/vendorSaga";
import {
  watchAddToCart,
  watchDeleteCartItem,
  watchEmptyCart,
  watchFetchCart,
  watchPatchCart,
} from "../pages/cart-page/cartSaga";
import { watchFetchAllInventories, watchFetchInventroyById, watchPatchInventory } from "../pages/inventory-page/inventorySaga";
import { watchFetchAllLowStocks } from "../pages/low-stocks-page/lowStocksSaga";
import { watchFetchAllInventoryOrders, watchFetchAllOrders, watchFetchOrderById, watchPatchInventoryOrder, watchPatchOrder, watchPlaceOrder } from "../pages/orders-page/ordersSaga";

export default function* rootSaga() {
  yield all([
    watchAuthUser(),
    watchFetchAllProducts(),
    watchPostVendor(),
    watchFetchAllCategories(),
    watchFetchProductById(),
    watchPatchProduct(),
    watchAddProduct(),
    watchDeleteProduct(),
    watchDeleteVendor(),
    watchPatchVendor(),
    watchFetchVendorById(),
    watchFetchAllVendors(),
    watchDeleteCartItem(),
    watchAddToCart(),
    watchPatchCart(),
    watchFetchCart(),
    watchEmptyCart(),
    watchPatchInventory(), watchFetchInventroyById(), watchFetchAllInventories(),
    watchFetchAllLowStocks(),
    watchFetchAllOrders(),
    watchFetchAllInventoryOrders(),
    watchPlaceOrder(),
    watchFetchOrderById(),
    watchPatchOrder(),
    watchPatchInventoryOrder()
  ]);
}
