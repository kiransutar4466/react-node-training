import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import Dashboard from "../pages/dashboard/Dashboard";

import ViewMoreEventDetails from "../pages/viewMoreEventDetails/ViewMoreEventDetails";
import Shows from "../pages/shows/Shows";
import AdminDashboard from "../pages/adminDashboard/AdminDashboard";
import RegistrationPage from "../pages/registration/RegistrationPage";
import Layout from "../layout's/Layout";
import DasboardData from "../pages/adminDashboard/dashboardData/DasboardData";
import UserTickets from "../component/userTickets/UserTickets";

const router = createBrowserRouter([
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path:'register',
    element:<RegistrationPage/>
  },
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "viewMore-EventDetails/:id",
    element: <ViewMoreEventDetails />,
  },
  {
    path:'user-tickets',
    element:<UserTickets/>
  },
  {
    path:'layout',
    element:<Layout/>,
    children: [
      
  
      { path: "admin-dashboard", element: <AdminDashboard /> },
      { path: "dasboard-data", element: <DasboardData /> },
     
    ],
  },
  {
    path:'shows/:id',
    element:<Shows/>
  }
]);

export default router;
