import { Outlet } from "react-router-dom";
import SideBar from "../component/sideBar/Side";
import { useSelector } from "react-redux";

const Layout = () => {
  const isExpanded = useSelector((state: any) => state.sidebar.isExpanded);

  
  const sidebarWidth = isExpanded ? "20%" : "70px";
  const outletWidth = isExpanded ? "80%" : "calc(100% - 70px)";

  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar />
      <div
        style={{ marginLeft: sidebarWidth, width: outletWidth }}
        className="transition-all duration-300 ease-in-out p-4 overflow-auto"
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
