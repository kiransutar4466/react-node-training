import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserTickets } from "./userTicketSaga";
import { RootState } from "../../store/store";
import { LinearProgress } from "@mui/material";
import moment from "moment";
import './ticket.css'
import { jwtDecode, JwtPayload } from "jwt-decode";
import { IoMdArrowRoundBack } from "react-icons/io";
import TicketList from "./TicketList";

const UserTickets = () => {
  const naviagte = useNavigate();
  const dispatch=useDispatch()
  const {ticketData,userTicketloading}=useSelector((state:RootState)=>state.userTickets)



  // const handleDownload = (ticketId: any) => {
  //   alert(`Downloading ticket: ${ticketId}`);
  // };

  useEffect(()=>{
    const token:any=localStorage.getItem('token')
    if(token){
      const decoded:JwtPayload& { user_id?: number } =jwtDecode(token);
      dispatch(getUserTickets(decoded))
    }
  
  },[dispatch])

  return (
    <>
      <div className="max-w-3xl mx-auto p-6 relative top-8 left-[-18px]">
        <div className="absolute">
          <button
            onClick={() => naviagte("/")}
            className="mt-3 cursor-pointer  bg-[#fffffffc] text-[#343232] px-4 py-2 rounded-md transition"
          >
             <IoMdArrowRoundBack size={24} />
          </button>
        </div>
      </div>
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-center mb-6">My Tickets</h2>
        {userTicketloading&&
              <LinearProgress />

        }
        {ticketData.length === 0 ? (
          <p className="text-center text-gray-500">No tickets purchased yet.</p>
        ) : (
          <TicketList ticketData={ticketData}/>
        )}

        <div>

    
        </div>

      </div>
    </>
  );
};

export default UserTickets;
