
import { useEffect } from "react";
import { FaTicketAlt, FaRegCalendarAlt } from "react-icons/fa";
import { getAllEvents } from "../../displayAllEvents/getAllEventsSaga";
import { useDispatch, useSelector } from "react-redux";
import { getUserTickets } from "../../../component/userTickets/userTicketSaga";
import { RootState } from "../../../store/store";
import { CircularProgress } from "@mui/material";
import { Loader } from "lucide-react";
import TicketsBarChart from "./TicketsBarChart";
// import TicketsBarChart from "./TicketsBarChart";


const DashboardData = () => {
  const dispatch=useDispatch()
  const {data}=useSelector((state:any)=>state.getAllEvents)
   const {ticketData,userTicketloading}=useSelector((state:RootState)=>state.userTickets)
  useEffect(()=>{
    const payload = {
      eventName: "",
      eventCategory: "",
      eventStartDate: "",
      eventEndDate: "",
      nextPage:1
    };
      
        dispatch(getUserTickets(""))
   
       dispatch(getAllEvents(payload))
  },[])
  
  const stats = [
    {
      id: 1,
      title: "Total Tickets Booked",
      value:ticketData&& ticketData?.length,
      icon: <FaTicketAlt className="text-blue-400 text-4xl" />,
      bg: "bg-gradient-to-r from-gray-900 to-gray-800",
    },
    {
      id: 2,
      title: "Total Events Created",
      value: `${data&&data?.data?.length||0}`,
      icon: <FaRegCalendarAlt className="text-green-400 text-4xl" />,
      bg: "bg-gradient-to-r from-gray-800 to-gray-700",
    },
    // {
    //   id: 3,
    //   title: "Total  Shows Created",
    //   value: 5,
    //   icon: <FaTheaterMasks className="text-purple-400 text-4xl" />,
    //   bg: "bg-gradient-to-r from-gray-700 to-gray-600",
    // },
  ];



  return (
    <>
    <div className="p-6 grid max-w-1/1 mx-auto mt-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
     { userTicketloading?<Loader/>:
      stats.map((stat) => (
        <div
          key={stat.id}
          className={`rounded-xl p-6 shadow-md flex items-center gap-4 ${stat.bg} hover:shadow-lg transition duration-300`}
        >
          <div>{stat.icon}</div>
          <div>
            <h3 className="text-lg text-gray-300">{stat.title}</h3>
            <p className="text-2xl font-bold text-white">{userTicketloading?  <CircularProgress size="30px" />:stat.value}</p>
          </div>
        </div>
      ))}

    </div>
    {/* <div className="p-4 border-[2px] w-[50%] mx-7 rounded-[12px] bg-gradient-to-r from-[#ebe9e9] to-[#f5f5f5] text-white">
      <TicketsBarChart />
    </div> */}
    </>
   
  );
};

export default DashboardData;
