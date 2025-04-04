import { Outlet } from "react-router-dom";
import Navbar from "../component/navBar/Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainLayout;
