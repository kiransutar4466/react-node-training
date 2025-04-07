import { useEffect, useState } from "react";
import { FaTicketAlt, FaRegCalendarAlt, FaRupeeSign } from "react-icons/fa";
import { getAllEvents } from "../../displayAllEvents/getAllEventsSaga";
import { useDispatch, useSelector } from "react-redux";

import TicketsBarChart from "./TicketsBarChart";

import StatCard from "../../../component/statCard/StatCard";
import DashboardHeader from "../../../component/statCard/DashboardHeader";
import RunningShowsTable from "../../../component/statCard/RunningShowsTable";
import { getDashboardData } from "../dashboardSaga";
import CategoryFilter from "../../../component/cateGoryFilter/CategoryFilter";
import { categories1 } from "../../../constant/createEventConstant";
// import TicketsBarChart from "./TicketsBarChart";
const dataCate = {
  Category: categories1,
  Eventtype: ["ongoing", "upcoming", "past"],
};
const DashboardData = () => {
  const dispatch = useDispatch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { dashboardData, loading } = useSelector(
    (state: any) => state.dashboard
  );

  const { data } = useSelector((state: any) => state.getAllEvents);

  const stats = [
    {
      id: 1,
      title: "Total Tickets Booked",
      value: dashboardData && dashboardData?.totalTicketBooked,
      icon: <FaTicketAlt className="text-blue-400 text-4xl" />,
      bg: "bg-gradient-to-r from-gray-900 to-gray-800",
    },
    {
      id: 2,
      title: "Total Events Created",
      value: `${dashboardData && dashboardData?.totalEvents}`,
      icon: <FaRegCalendarAlt className="text-green-400 text-4xl" />,
      bg: "bg-gradient-to-r from-gray-800 to-gray-700",
    },
    {
      id: 3,
      title: "Total Earnings",
      value: dashboardData && dashboardData?.totalRevenue,
      icon: <FaRupeeSign className="text-purple-400 text-4xl" />,
      bg: "bg-gradient-to-r from-gray-700 to-gray-600",
    },
  ];
  // const showsData = dashboardData?.upcomingEventsData?.data?.map(
  //   (event: any) => ({
  //     name: event.eventName,
  //     description: event.eventDescription,
  //     time: `${event.eventSlots[0]?.startTime} - ${event.eventSlots[0]?.endTime}`,
  //     day: event.eventSlots[0]?.day || "N/A",
  //     status: "Running",
  //     image: event.eventImage,
  //     startTime: event?.eventStartDate,
  //     category: event?.eventCategory,
  //   })
  // );
  const showsData = data?.data?.map(
    (event: any) => ({
      name: event.eventName,
      description: event.eventDescription,
      time: `${event.eventSlots[0]?.startTime} - ${event.eventSlots[0]?.endTime}`,
      day: event.eventSlots[0]?.day || "N/A",
      status: "Running",
      image: event.eventImage,
      startTime: event?.eventStartDate,
      category: event?.eventCategory,
    })
  );

  const handleAdd = (selection: any) => {
    if (dataCate?.Eventtype.includes(selection.type)) {
      const payload = {
        eventName: "",
        eventCategory: "",
        eventStartDate: "",
        eventEndDate: "",
        nextPage: 1,
        eventStatus: selection.type || "",
      };
      dispatch(getAllEvents(payload));
    } else {
      const payload = {
        eventName: "",
        eventCategory: selection.type || "",
        eventStartDate: "",
        eventEndDate: "",
        nextPage: 1,
        eventStatus: "",
      };
      dispatch(getAllEvents(payload));
    }
    setIsFilterOpen(false);
  };
  
  useEffect(() => {
    const payload = {
      eventName: "",
      eventCategory: "",
      eventStartDate: "",
      eventEndDate: "",
      nextPage: 1,
      eventStatus:''
    };

    dispatch(getAllEvents(payload));
  }, []);

  useEffect(() => {
    dispatch(getDashboardData());
  }, []);
  return (
    <>
      <DashboardHeader text="Dashboard" />
      <div className="py-4 hide-scrollbar grid max-w-1/1 mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
            bg={stat.bg}
            loading={loading}
          />
        ))}
      </div>
      <div className="flex gap-4">
        <div className="w-[50%] relative">
          <div>
            <RunningShowsTable
              shows={showsData || []}
              setIsFilterOpenCB={() => setIsFilterOpen((prev) => !prev)}
            />
          </div>

          {isFilterOpen && (
            <div className="absolute top-14 left-24">
              <CategoryFilter data={dataCate} onAdd={handleAdd} />
            </div>
          )}
        </div>

        <div className="border-[2px] w-[50%]  rounded-[12px] bg-gradient-to-r from-[#ebe9e9] to-[#e5e4e4] text-white">
          <TicketsBarChart data={dashboardData?.ticketsPerMonth || []} />
        </div>
      </div>
    </>
  );
};

export default DashboardData;
