import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import Loader from "../component/Loader";
import MainLayout from "../layout's/MainLout";
import AdminDashboard from "../pages/adminDashboard/AdminDashboard";
import Layout from "../layout's/Layout";
import DashboardData from "../pages/adminDashboard/dashboardData/DasboardData";


const LoginPage = lazy(() => import("../pages/login/LoginPage"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const ViewMoreEventDetails = lazy(() => import("../pages/viewMoreEventDetails/ViewMoreEventDetails"));
const Shows = lazy(() => import("../pages/shows/Shows"));
const RegistrationPage = lazy(() => import("../pages/registration/RegistrationPage"));
const UserTickets = lazy(() => import("../component/userTickets/UserTickets"));

const router = createBrowserRouter([

  { path: "login", element: <Suspense fallback={<Loader />}><LoginPage /></Suspense> },
  { path: "register", element: <Suspense fallback={<Loader />}><RegistrationPage /></Suspense> },


  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      { path: "", element: <Suspense fallback={<Loader />}><Dashboard /></Suspense> },
      { path: "viewMore-EventDetails/:id", element: <Suspense fallback={<Loader />}><ViewMoreEventDetails /></Suspense> },
      { path: "user-tickets", element: <Suspense fallback={<Loader />}><UserTickets /></Suspense> },
      { path: "shows/:id", element: <Suspense fallback={<Loader />}><Shows /></Suspense> },
    ],
  },
  {
    path: "admin",
    element: (
      <Suspense fallback={<Loader />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        path: "event-management",
        element: (
          <Suspense fallback={<Loader />}>
            <AdminDashboard />
          </Suspense>
        ),
      },
    
      {
        path: "admin-dashboard",
        element: (
          <Suspense fallback={<Loader />}>
            <DashboardData />
          </Suspense>
        ),
      },
     
    ],
  },
]);

export default router;
