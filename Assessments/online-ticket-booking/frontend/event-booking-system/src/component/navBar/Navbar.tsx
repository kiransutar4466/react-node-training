import { useNavigate } from "react-router-dom";
import Button from "../buttons/Button";
import { FaUserAlt } from "react-icons/fa";
import { IoIosSearch, IoMdLogOut } from "react-icons/io";
import { useEffect, useState } from "react";
import { useDebounceHook } from "../../utils/useDebounceHook";
import { useDispatch } from "react-redux";
import { getAllEvents } from "../../pages/displayAllEvents/getAllEventsSaga";
const Navbar = () => {
  const naviagte = useNavigate();
  const dispatch=useDispatch()
  const token=localStorage.getItem('token')

  const [searchText,setSearchText]=useState('')
  const handleLogOut = () => {
    localStorage.removeItem('token')
    naviagte("/login");
  };

  const handleRedirect=()=>{
    naviagte("/login");
  }
  const value=useDebounceHook(searchText)
 useEffect(() => {
     const payload = {
       eventName: value,
       eventCategory: "",
       eventStartDate: "",
       eventEndDate: "",
     };
    
      
       dispatch(getAllEvents(payload));
     
     
   
   }, [value]);
  return (
    <div className="p-2 flex justify-between bg-[#22242B] ">
       <div className="w-[10%] flex justify-center items-center">
          <p className="text-[16px] text-white ">Event Booking</p>
       </div>
      <div className="flex gap-10">
      <div className="w-[20%] flex justify-center items-center">
          {token&&<p className="text-[16px] cursor-pointer text-white" onClick={()=>naviagte('/user-tickets')}>My-Tickets</p>}
       </div>
        <div className="flex justify-center items-center">
          <input
            type="text"
            name=""
            id=""
            onChange={(e)=>setSearchText(e.target.value)}
            placeholder="Seacrh by event name"
            className=" h-[40px] px-2  border-2 text-[0.9rem] bg-[white] rounded-[14px]"
          />
          <button className="text-[40px] p-2 cursor-pointer"><IoIosSearch className="text-white"/></button>
        </div>
        <div>

       
        <div className="mt-2 px-2">
        {token? <button className="cursor-pointer p-2 rounded-[4px] text-white flex justify-center items-center gap-2 h-10" onClick={handleLogOut}>
          logout
        <IoMdLogOut  className="text-[white]" />
        </button>: <button className="cursor-pointer p-2 rounded-[4px]  text-white flex justify-center items-center gap-2 h-10" onClick={handleRedirect}>
          Login
        <FaUserAlt  className="text-white" />
        </button>
        }
        </div>
        </div>
        
      </div>
     
        
     
  
    </div>
  );
};

export default Navbar;
