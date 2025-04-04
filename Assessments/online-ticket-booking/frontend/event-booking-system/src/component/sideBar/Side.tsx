
import { Home, LayoutDashboard } from "lucide-react"; 
import NavButton from "../navButtons/NavButton";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../../pages/login/authSlice";


const SideBar = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleLogOut = () => {
    dispatch(logoutAdmin(navigate))
  };
  return (
    <div className="w-1/5 h-screen bg-black text-white flex flex-col p-4 fixed ">
      <h2 className="ms-1 text-2xl font-bold mb-6 text-left">Admin</h2>
      
      <nav className="space-y-4">
      <NavButton to="/layout/dasboard-data" icon={<LayoutDashboard size={20} />} label="Dashboard" />
        <NavButton to="/layout/admin-dashboard" icon={<Home size={20} />} label="Event Management" />
      
      </nav>

      <div className="absolute bottom-4 ">
          <button className="p-2 bg-white font-semibold text-black rounded-[4px] cursor-pointer" onClick={handleLogOut}>Logout</button>
      </div>
    </div>
  );
};


export default SideBar