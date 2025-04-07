import EventDisplayCard from "../../component/eventDispalyCards/EventDisplayCard";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "./getAllEventsSaga";

import NoDataFound from "../../component/no-data-found/NoDataFound";
import { LinearProgress } from "@mui/material";
import { categories1 } from "../../constant/createEventConstant";
import EventGrid from "../../component/eventGrid/EventGrid";
import { getDashboardData } from "../adminDashboard/dashboardSaga";

const DisplayAllEvents = () => {
  const [selectedText, setSelectedText] = useState("All");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state: any) => state.getAllEvents);
  const { dashboardData } = useSelector((state: any) => state.dashboard);

  const handleNavigation = (id: any) => {
    navigate(`/viewMore-EventDetails/${id}`);
  };

  const handleFilterCategory = (seletedText: any) => {
    setSelectedText(seletedText);
  };

  // useEffect(() => {
  //   dispatch(getDashboardData());
  // }, []);
  useEffect(() => {
    const payload = {
      eventName: "",
      eventCategory: selectedText,
      eventStartDate: "",
      eventEndDate: "",
      nextPage: 1,
      eventStatus: "",
    };
    dispatch(getAllEvents(payload));
  }, [selectedText]);

  return (
    <div className="">
      <div className="w-[80%] mx-auto  px-5  mt-4">
        <p className="text-[1.4rem] font-bold">Show List</p>
      </div>
      <div className="w-[80%] mx-auto flex flex-wrap gap-5 px-5 mt-4">
        {categories1.map((cate) => (
          <p
            className={`${
              selectedText === cate
                ? "bg-[#000000] text-[#ffffff]"
                : "bg-[#dfdfdf] text-black"
            } p-2 rounded-[8px] px-4 cursor-pointer`}
            onClick={() => handleFilterCategory(cate)}
          >
            {cate}
          </p>
        ))}
      </div>

      <div className="w-[80%] mx-auto ">{loading && <LinearProgress />}</div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6  w-[80%] mx-auto ">
        {data && data?.data?.length ? (
          data?.data?.map(
            (
              item: {
                id: string;
                eventName: string;
                eventDescription: string;
                eventCategory: string;
                eventImage: string;
              },
              index: number
            ) => (
              <EventDisplayCard
                key={index}
                id={item.id}
                eventName={item.eventName}
                eventDescription={item.eventDescription}
                eventCategory={item.eventCategory}
                eventImage={item.eventImage}
                handleNavigationCB={handleNavigation}
              />
            )
          )
        ) : (
          <NoDataFound text="No events found" />
        )}
      </div>
      <EventGrid
        data={dashboardData && dashboardData?.upcomingEventsData?.data}
        loading={loading}
        heading="Upcoming Events"
        handleNavigation={handleNavigation}
      />
    </div>
  );
};

export default DisplayAllEvents;
