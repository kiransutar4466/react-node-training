import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData } from "../../pages/adminDashboard/dashboardSaga";

const DashboardBanner = () => {
  const dispatch = useDispatch();
  const { dashboardData } = useSelector((state: any) => state.dashboard);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!dashboardData?.upcomingEventsData?.data?.length) {
      dispatch(getDashboardData());
    }
  }, [dashboardData, dispatch]);


  
  useEffect(() => {
    const events = dashboardData?.upcomingEventsData?.data;
    if (!events || events.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === events.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [dashboardData]);

  const currentEvent = dashboardData?.upcomingEventsData?.data?.[currentIndex];

  if (!currentEvent) return null;

  return (
    <div>
      <div
        className="flex items-center w-full h-[calc(100vh_-_3.7rem)] bg-gray-200 bg-cover bg-center bg-no-repeat overflow-hidden transition-all duration-500"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,0)), url(${currentEvent.eventImage})`,
        }}
      >
        <div className="w-full md:w-[40%] bg-[#76494900] mx-10 md:mt-50 md:mx-30 transition-opacity duration-500">
          <p className="text-[3rem] font-bold text-white">
            {currentEvent.eventName}
          </p>
          <p className="text-white text-[12px] mt-2">
            {currentEvent.eventDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardBanner;
