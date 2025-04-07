import { NavLink, useLocation } from "react-router-dom";

const NavButton = ({ to, icon, label, showLabel }:any) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink
      to={to}
      className={`flex items-center gap-3 p-2 rounded-md transition-all duration-200 ${
        isActive ? "bg-white text-black font-semibold" : "bg-black text-white"
      }`}
    >
      {icon}
      {showLabel? <span>{label}</span>:""}
    </NavLink>
  );
};

export default NavButton;
