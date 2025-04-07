import { Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
const LoginPage = lazy(() => import("../pages/login-page/LoginPage"));
const ProductListPage = lazy(
  () => import("../pages/product-list-page/ProductListPage"),
);
const DashboardPage = lazy(
  () => import("../pages/dashboard-page/DashboardPage"),
);
const Custom404Page = lazy(
  () => import("../pages/custom-404-page/Custom404Page"),
);
const CartPage = lazy(() => import("../pages/cart-page/CartPage"));
const InventoryPage = lazy(
  () => import("../pages/inventory-page/InventoryPage"),
);
const LowStocksPage = lazy(
  () => import("../pages/low-stocks-page/LowStocksPage"),
);
const OrdersPage = lazy(() => import("../pages/orders-page/OrdersPage"));
const SettingsPage = lazy(() => import("../pages/settings-page/SettingsPage"));
import { useSelector } from "react-redux";
import { rootState } from "../store/store";
const RedirectComponent = lazy(() => import("../components/RedirectComponent"));

import Loader from "../components/Loader";
import PrivateRoute from "../components/PrivateRoute";
import { ADMIN, VENDOR } from "../constants/roles";
const Product = lazy(() => import("../pages/product-page/Product"));
const ManageVendorsPage = lazy(
  () => import("../pages/manage-vendors-page/ManageVendorsPage"),
);

const Router = () => {
  const { userDetails } = useSelector((state: rootState) => state.auth);

  return (
    <Routes>
      {/* public routes */}
      {!userDetails && (
        <Route
          path={"/"}
          element={
            <Suspense fallback={<Loader />}>
              <RedirectComponent page={<LoginPage />} />
            </Suspense>
          }
        />
      )}
      <Route
        path={"/login"}
        element={
          <Suspense fallback={<Loader />}>
            <RedirectComponent page={<LoginPage />} />
          </Suspense>
        }
      />
      <Route
        path={"*"}
        element={
          <Suspense fallback={<Loader />}>
            <RedirectComponent page={<Custom404Page />} />{" "}
          </Suspense>
        }
      />

      {/* protected routes */}
      <>
        {userDetails && (
          <>
            <Route
              path={"/"}
              element={
                <Suspense fallback={<Loader />}>
                  {" "}
                  <DashboardPage />{" "}
                </Suspense>
              }
            />
            <Route
              path={"/dashboard"}
              element={
                <Suspense fallback={<Loader />}>
                  {" "}
                  <DashboardPage />{" "}
                </Suspense>
              }
            />
            <Route
              path={"/products"}
              element={
                <Suspense fallback={<Loader />}>
                  {" "}
                  <ProductListPage />{" "}
                </Suspense>
              }
            />
            <Route
              path={"/products/:id"}
              element={
                <Suspense fallback={<Loader />}>
                  {" "}
                  <Product />{" "}
                </Suspense>
              }
            />
            <Route
              path={"/low-stocks"}
              element={
                <Suspense fallback={<Loader />}>
                  <LowStocksPage />{" "}
                </Suspense>
              }
            />
            <Route
              path={"/orders"}
              element={
                <Suspense fallback={<Loader />}>
                  <OrdersPage />{" "}
                </Suspense>
              }
            />

            {/* private routes */}
            <Route
              path={"/settings"}
              element={
                <Suspense fallback={<Loader />}>
                  {" "}
                  <PrivateRoute
                    page={<SettingsPage />}
                    allowedRoles={[VENDOR]}
                  />{" "}
                </Suspense>
              }
            />
            <Route
              path={"/manage-vendors"}
              element={
                <Suspense fallback={<Loader />}>
                  {" "}
                  <PrivateRoute
                    page={<ManageVendorsPage />}
                    allowedRoles={[ADMIN]}
                  />{" "}
                </Suspense>
              }
            />
            <Route
              path={"/inventory"}
              element={
                <Suspense fallback={<Loader />}>
                  {" "}
                  <PrivateRoute
                    page={<InventoryPage />}
                    allowedRoles={[ADMIN]}
                  />{" "}
                </Suspense>
              }
            />
            <Route
              path={"/cart"}
              element={
                <Suspense fallback={<Loader />}>
                  {" "}
                  <PrivateRoute page={<CartPage />} allowedRoles={[VENDOR]} />
                </Suspense>
              }
            />
          </>
        )}
      </>
    </Routes>
  );
};

export default Router;
