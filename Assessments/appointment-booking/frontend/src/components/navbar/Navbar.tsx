import { Link } from "react-router-dom";
import "./Navbar.css";
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

export const Navbar = () => {
  return (
    <nav className=" flex justify-between items-center bg-primary h-[72px] text-white  sticky inset-0 z-99 ">
      <ul className=" nav flex gap-4 ml-[72px]">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/dashboard/patient">Patient</Link>
        </li>
        <li>
          <Link to="/dashboard/doctor">Provider</Link>
        </li>
        <li>
          <Link to="/dashboard/appointment">Appointment</Link>
        </li>
        {/* <li>
          <Link to="/dashboard/signup">provider</Link>
        </li> */}
      </ul>
      <div className=" icons flex justify-around  ">
        <div>
          <IoIosNotifications />
        </div>
        <div>
          <Link to="/dashboard/profile">
            <CgProfile />
          </Link>
        </div>
      </div>
    </nav>
  );
};
