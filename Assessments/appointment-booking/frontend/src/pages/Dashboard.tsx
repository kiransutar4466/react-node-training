import { Card } from "@/components/Card/Card";

import { Link } from "react-router-dom";
import CalendarApp from "@/components/ScheduleCalender/Calender";
const data = {
  highlight: [
    {
      heading: "Total Patients",
      count: 5,
      to: "patient",
    },
    {
      heading: "Provider",
      count: 4,
      to: "doctor",
    },
    {
      heading: "Appointments",
      count: 6,
      to: "doctor",
    },
    {
      heading: "Test Conducted",
      count: 21,
      to: "doctor",
    },
    {
      heading: "Pending Reports",
      count: 21,
      to: "doctor",
    },
  ],
  events: [
    {
      id: 1,
      title: "Appointment",
      people: ["shivani"],
      start: "2025-03-28 17:59",
      end: "2025-03-28 18:29",
    },
    {
      id: 2,
      title: "Appointment",
      people: ["shivani"],
      start: "2025-03-26 06:59",
      end: "2025-03-26 07:29",
    },
  ],
};
const Dashboard = () => {
  return (
    <div>
      <div className=" flex gap-6 overflow-x-auto pl-3 dashboard-highlight mx-8">
        {data.highlight.map(({ heading, count, to }, index) => {
          return (
            <Link key={index} to={to}>
              <Card heading={heading} content={count} />
            </Link>
          );
        })}
      </div>
      <div className=" grid grid-cols-8 gap-2.5 w-full  mt-10 px-4">
        <div className=" col-start-1 col-end-7 w-full h-full">
          <CalendarApp events={data.events} />
        </div>
        <div className="bg-primary col-start-7 col-end-9 w-full h-full"></div>
      </div>
    </div>
  );
};

export default Dashboard;
