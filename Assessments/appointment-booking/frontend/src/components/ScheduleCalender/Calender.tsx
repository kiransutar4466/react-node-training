import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { useState, useEffect } from "react";
import "@schedule-x/theme-shadcn/dist/index.css";

function CalendarApp(props) {
  const eventsService = useState(() => createEventsServicePlugin())[0];
  useEffect(() => {
    // Function to handle the click event
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      console.log(event.target);

      if (target && target.getAttribute("role") === "button") {
        const eventId = target.getAttribute("data-event-id");
        if (eventId) {
          alert(`Button clicked with data-event-id: ${eventId}`);
        }
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  // Generate 10 events dynamically with 30-minute intervals from the current time
  // const generateEvents = () => {
  //   const now = new Date();
  //   return Array.from({ length: 10 }, (_, i) => {
  //     const start = new Date(now.getTime() + i * 30 * 60000);
  //     const end = new Date(start.getTime() + 30 * 60000);
  //     return {
  //       id: i + 1,
  //       title: `Meeting ${i + 1}`,
  //       start: start.toISOString().slice(0, 16).replace("T", " "),
  //       end: end.toISOString().slice(0, 16).replace("T", " "),
  //     };
  //   });
  // };

  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    calendars: {
      johndoe: {
        label: "John Doe",
        colorName: "johndoe",
        lightColors: {
          main: "bg-primary",
          container: "bg-primary",
          onContainer: "bg-primary",
        },
      },
    },
    events: props.events,
    plugins: [eventsService],
  });

  useEffect(() => {
    eventsService.getAll();
  }, []);

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default CalendarApp;
