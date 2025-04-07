import { Home, LayoutDashboard } from "lucide-react"; 
import NavButton from "../navButtons/NavButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "../../pages/login/authSlice";

import { useRef } from "react";
import { collapseSidebar, expandSidebar } from "./sidebarSlice";

const Side = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isExpanded = useSelector((state:any) => state.sidebar.isExpanded);
  const timeoutRef = useRef<any>(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      dispatch(expandSidebar());
    }, 100);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      dispatch(collapseSidebar());
    }, 100);
  };

  const handleLogOut = () => {
    dispatch(logoutAdmin(navigate));
  };

  return (
    <div
      className={`h-screen bg-black text-white flex flex-col p-4 fixed top-0 left-0 transition-all duration-300 ease-in-out z-10 ${
        isExpanded ? "w-1/5" : "w-[70px]"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h2
        className={`ms-1 text-2xl font-bold mb-6 text-left transition-opacity duration-300
        }`}
      >
        {
          isExpanded ? "Admin" : "A"} 
      </h2>
      <hr className="mb-2"/>

      <nav className="space-y-4">
        <NavButton
          to="/admin/admin-dashboard"
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          showLabel={isExpanded}
        />
        <NavButton
          to="/admin/event-management"
          icon={<Home size={20} />}
          label="Event Management"
          showLabel={isExpanded}
        />
      </nav>
      
    

      <div className="absolute bottom-4 left-4 right-4">
        {isExpanded && (
          <button
            className="w-full p-2 bg-white font-semibold text-black rounded-[4px] cursor-pointer transition-all"
            onClick={handleLogOut}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Side;
