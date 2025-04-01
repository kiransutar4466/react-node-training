import { evevntDataCard } from "../../constant/eventCardData";
import EventDisplayCard from "../../component/eventDispalyCards/EventDisplayCard";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "./getAllEventsSaga";

import { RootState } from "../../store/store";
import { getEventById } from "../../component/createEventForm/createEventSaga";

const DisplayAllEvents = () => {
  const [isActive, setIsactiove] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.getAllEvents);

  const handleNavigation = (id: any) => {
    navigate(`/viewMore-EventDetails/${id}`);
    
    
  };

  useEffect(() => {
    const payload = {
      eventName: "",
      eventCategory: "",
      eventStartDate: "",
      eventEndDate: "",
    };
    dispatch(getAllEvents(payload));
  }, []);
  return (
    <div className="">
      {/* <div className="w-[80%] mx-auto flex gap-5 px-5 mt-4">
  <p
    className={`${
      isActive === "All" ? "bg-[#000000] text-[#ffffff]" : "bg-[#dfdfdf] text-black"
    } p-2 rounded-[8px] px-4 cursor-pointer`}
    onClick={() => setIsactiove("All")}
  >
    All
  </p>

  <p
    className={`${
      isActive === "Today" ? "bg-[#000000] text-[#ffffff]" : "bg-[#dfdfdf] text-black"
    } p-2 rounded-[8px] px-4 cursor-pointer`}
    onClick={() => setIsactiove("Today")}
  >
    Today
  </p>
</div> */}

      <div className="w-[80%] mx-auto  px-5  mt-4">
        <p className="text-[1.4rem] font-bold">Book Shows</p>
      </div>
      {/* /h-[calc(100vh-140px)] */}
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6  w-[80%] mx-auto ">
        {data &&
          data.map(
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
          )}
      </div>
    </div>
  );
};

export default DisplayAllEvents;
