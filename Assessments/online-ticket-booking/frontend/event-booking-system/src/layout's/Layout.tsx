import { Outlet } from "react-router-dom";
import SideBar from "../component/sideBar/Side";
import useAuthRedirect from "../utils/useAuthRedirect";
const Layout = () => {
      //   useAuthRedirect()
  return (
    <div className="flex h-screen">
      {/* Sidebar takes 1/5 of the screen */}
      <div className="w-1/5">
        <SideBar />
      </div>

      {/* Outlet container takes 4/5 of the screen */}
      <div className="w-4/5 p-2">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
