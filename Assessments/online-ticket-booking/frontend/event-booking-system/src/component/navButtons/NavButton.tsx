import { NavLink } from "react-router-dom";

const NavButton = ({ to, icon, label }: { to: string; icon: any; label: string }) => {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-2 rounded-lg transition duration-300 
          ${isActive ? "bg-white text-black font-semibold" : "bg-black text-white hover:bg-gray-800"}`
        }
      >
        {icon}
        <span>{label}</span>
      </NavLink>
    );
  };

  export default NavButton