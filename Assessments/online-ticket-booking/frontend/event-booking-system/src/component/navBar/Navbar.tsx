import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDebounceHook } from "../../utils/useDebounceHook";
import { useDispatch } from "react-redux";
import { getAllEvents } from "../../pages/displayAllEvents/getAllEventsSaga";
import { FaUserAlt } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { GiTicket } from "react-icons/gi";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const [searchText, setSearchText] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const value = useDebounceHook(searchText);



 

  useEffect(() => {
  
    
      const payload = {
        eventName: value,
        eventCategory: "",
        eventStartDate: "",
        eventEndDate: "",
        nextPage: 1,
        eventStatus: ""
      };
      dispatch(getAllEvents(payload));
    
  }, [value, dispatch]);

  return (
    <div className="p-2 sticky top-0 flex justify-between bg-[#22242B] z-10 items-center shadow-md">
      <div className="flex items-center gap-2 w-[20%] px-4">
        <GiTicket size={30} className="text-yellow-400" />

        <p className="text-[20px] font-bold text-white tracking-wide hidden sm:hidden md:block">
          Prime Seat
        </p>
      </div>

      <div className="flex items-center gap-1 w-[90%]">
        {/*     
        {token && (
          <p
            className="text-[16px] cursor-pointer text-white hover:text-yellow-400 transition"
            onClick={() => navigate("/user-tickets")}
          >
            My Tickets
          </p>
        )} */}

<div className="flex items-center bg-[#22242B] rounded-[9px] px-2 border-2">
  <IoIosSearch className="text-gray-500 text-lg" />
  <input
    type="text"
    placeholder="Search events"
    onChange={(e)=>  setSearchText(e.target.value)}
    className="h-[40px] w-50 sm:w-60 md:w-80 px-2 border-none outline-none text-[0.9rem] bg-[#22242B] text-white placeholder-gray-400"
  />
</div>

      </div>

      <div className="relative w-[20%] flex justify-end px-4">
        <button
          className="cursor-pointer p-2 rounded-[4px] text-white flex justify-center items-center gap-2 h-10"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <FaUserAlt className="text-white" />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-11 right-1 mt-2 w-40 bg-white shadow-md rounded-lg">
            {token && (
              <button
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 hover:rounded-lg"
                onClick={() => {
                  navigate("/user-tickets");
                  setIsDropdownOpen(false);
                }}
              >
                {" "}
                My Tickets
              </button>
            )}

            {token ? (
              <button
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200 hover:rounded-lg"
                onClick={handleLogOut}
              >
                <IoMdLogOut className="inline-block mr-2" />
                Logout
              </button>
            ) : (
              <button
                className="block w-full text-center px-4 py-2 text-[black] hover:bg-gray-200 hover:rounded-lg"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
