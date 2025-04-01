
import { useEffect } from "react";
import { FaTicketAlt, FaRegCalendarAlt, FaTheaterMasks } from "react-icons/fa";
import { getAllEvents } from "../../displayAllEvents/getAllEventsSaga";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const DashboardData = () => {
  const dispatch=useDispatch()
  const {data}=useSelector((state:RootState)=>state.getAllEvents)
  useEffect(()=>{
    const payload = {
      eventName: "",
      eventCategory: "",
      eventStartDate: "",
      eventEndDate: "",
    };
       dispatch(getAllEvents(payload))
  },[])
  
  const stats = [
    {
      id: 1,
      title: "Total Tickets Booked",
      value: 1200,
      icon: <FaTicketAlt className="text-blue-400 text-4xl" />,
      bg: "bg-gradient-to-r from-gray-900 to-gray-800",
    },
    {
      id: 2,
      title: "Total Events Created",
      value: `${data&&data.length}`,
      icon: <FaRegCalendarAlt className="text-green-400 text-4xl" />,
      bg: "bg-gradient-to-r from-gray-800 to-gray-700",
    },
    {
      id: 3,
      title: "Total  Shows Created",
      value: 5,
      icon: <FaTheaterMasks className="text-purple-400 text-4xl" />,
      bg: "bg-gradient-to-r from-gray-700 to-gray-600",
    },
  ];

  return (
    <div className="p-6 grid max-w-5xl mx-auto mt-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className={`rounded-xl p-6 shadow-md flex items-center gap-4 ${stat.bg} hover:shadow-lg transition duration-300`}
        >
          <div>{stat.icon}</div>
          <div>
            <h3 className="text-lg text-gray-300">{stat.title}</h3>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardData;
