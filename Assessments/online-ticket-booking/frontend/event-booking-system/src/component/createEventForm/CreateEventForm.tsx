import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "./createEventSaga";
import {
  categories,
  days,
  endTimes,
  seatOptions,
  startTimes,
} from "../../constant/createEventConstant";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { MdDeleteOutline } from "react-icons/md";
import { upDateEventDate } from "./updateEventSaga";
import { RootState } from "../../store/store";
import { CircularProgress } from "@mui/material";

const CreateEventForm = ({
  closeModalCB,
  eventData,
  setEventData,
  toggleText,
}: any) => {
  const dispatch = useDispatch();

  const { event } = useSelector((state: RootState) => state.eventById);
  const { loading } = useSelector((state: RootState) => state.updateEvent);
  const { createEventloading } = useSelector((state: RootState) => state.createEvent);
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setEventData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [image, setImage] = useState("");
  const handleEventImageChange = (e: any) => {
    const file = e.target.files?.[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setEventData((prev: any) => ({
          ...prev,
          eventImage: reader.result as string,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const [selectedDay, setSelectedDay] = useState<any>(null);
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");

  const handleAddTimeSlot = () => {
    if (selectedDay && selectedStartTime && selectedEndTime) {
      setEventData((prevData: any) => ({
        ...prevData,
        eventSlots: [
          ...prevData.eventSlots,
          {
            day: selectedDay,
            startTime: selectedStartTime,
            endTime: selectedEndTime,
          },
        ],
      }));

      setSelectedDay("");
      setSelectedStartTime("");
      setSelectedEndTime("");
    } else {
      toast.error(
        "Please select a day, start time, and end time before adding."
      );
    }
  };

  const handleDeleteSlot = (index: number) => {
    setEventData((prevData: any) => ({
      ...prevData,
      eventSlots: prevData.eventSlots.filter((_: any, i: any) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (event && event.id) {
      const payload = {
        id: event.id,
        data: eventData,
      };
      dispatch(upDateEventDate(payload));
    } else {
      const payload = {
        data: eventData,
        closeModal: closeModalCB,
      };
      dispatch(createEvent(payload));
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: JwtPayload & { role?: string; user_id: number } =
        jwtDecode(token);

      setEventData({ ...eventData, userId: decoded?.user_id });
    }
  }, []);

  console.log("evenitID", event);

  return (
    <div className="bg-white p-10 h-[90vh]  w-[100%] mx-auto shadow-lg overflow-y-scroll thin-scrollbar rounded-lg create-event-form relative ">
     <div className="flex justify-between">
     <h2 className="text-left text-2xl font-bold mb-4">{toggleText}</h2>  <p className="text-black text-2xl text-right px-4 cursor-pointer absoluteixed top-0 right-10 " onClick={closeModalCB}>X</p>
     </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="">Event Name</label>
        <input
          type="text"
          name="eventName"
          value={eventData.eventName}
          onChange={handleChange}
          placeholder="Enter  name"
          className="w-[100%] p-1 border rounded mt-1"
        />
        <label htmlFor="">Event Description</label>
        <textarea
          name="eventDescription"
          value={eventData.eventDescription}
          onChange={handleChange}
          placeholder="Event Description"
          className="w-full p-1 border rounded mt-1"
          required
        />

        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="">Ticket Price</label>
            <input
              type="number"
              name="eventPrice"
              value={eventData.eventPrice ?? ""}
              onChange={(e) => {
                let value = e.target.value;

                if (Number(value) < 0) {
                  value = "";
                }

                if (value.length > 10) {
                  value = value.slice(0, 10);
                }

                setEventData({
                  ...eventData,
                  eventPrice: value ? Number(value) : null,
                });
              }}
              placeholder="Enter Price"
              className="w-[100%] p-1 border rounded mt-1"
              required
              min="0"
            />
          </div>

          <div className="flex-1">
           {eventData.eventImage?"":<label htmlFor="">Upload Poster </label>} 
            <br />

            {eventData.eventImage ? (
            <div className="h-14 w-40 flex gap-4 items-center">
                <img
                  src={eventData.eventImage}
                  alt="Uploaded"
                  style={{
                    width: "100%",
                    height:"80px",
                  
                    objectFit: "cover",
                  }}
                />
               <p className="cursor-pointer" onClick={() => setEventData((prev:any) => ({ ...prev, eventImage: null }))}>
  X
</p>

              </div>
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={handleEventImageChange}
                className="w-74 border p-1 rounded  mt-1"
              />
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="">Event Type</label>
            <select
              name="eventCategory"
              value={eventData.eventCategory}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Type</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label htmlFor="">Select Total Seats</label>
            <select
              name="eventTotalSeats"
              value={eventData.eventTotalSeats ?? ""}
              onChange={(e) =>
                setEventData({
                  ...eventData,
                  eventTotalSeats: e.target.value
                    ? Number(e.target.value)
                    : null,
                })
              }
              className="w-full p-2 border rounded"
            >
              <option value="">Select Total Seats</option>
              {seatOptions.map((seat) => (
                <option key={seat} value={seat}>
                  {seat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor=""> Start Date</label>
            <input
              type="date"
              name="eventStartDate"
              value={eventData.eventStartDate}
              onChange={handleChange}
              className="w-1/1 p-1 border rounded"
              required
            />
          </div>

          <div className="flex-1">
            <label htmlFor=""> End Date</label>
            <input
              type="date"
              name="eventEndDate"
              value={eventData.eventEndDate}
              onChange={handleChange}
              className="w-1/1 p-1 border rounded"
              required
            />
          </div>
        </div>

        <label className="">Event Slots</label>
        <div className="flex gap-4">
          <select
            name="day"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="p-1 border rounded"
          >
            <option value="">Select Day</option>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>

          <select
            name="startTime"
            value={selectedStartTime}
            onChange={(e) => setSelectedStartTime(e.target.value)}
            className="p-1 border rounded"
          >
            <option value="">Start Time</option>
            {startTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>

          <select
            name="endTime"
            value={selectedEndTime}
            onChange={(e) => setSelectedEndTime(e.target.value)}
            className="p-1 border rounded"
          >
            <option value="">End Time</option>
            {endTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="bg-[#0091ff] p-1 px-4 text-white  rounded"
            onClick={handleAddTimeSlot}
          >
            Add Slots
          </button>
        </div>

        <ul className="list-disc">
          {eventData?.eventSlots?.length > 0 &&
            eventData.eventSlots.map((slot: any, index: number) => (
              <li
                key={index}
                className="flex mb-1 gap-4 rounded-[8px] justify-around items-center border-[#d4d4d4] border-[2px] shadow-2xl bg-[#ffffff] p-2 w-80"
              >
                <span>
                  {slot?.day} - {slot?.startTime} to {slot?.endTime}
                </span>
                <span
                  onClick={() => handleDeleteSlot(index)}
                  className="text-red-500 cursor-pointer"
                >
                  <MdDeleteOutline className="text-[18px]"/>
                </span>
              </li>
            ))}
        </ul>

        <div className="flex justify-center">
          {createEventloading ? (
            <button className="w-1/3 bg-black text-white p-2 rounded-[8px] cursor-pointer hover:shadow-2xl">
                <CircularProgress size="20px" />
            </button>
          ) : (
            <button
              type="submit"
              className="w-1/3 bg-black text-white p-2 rounded-[8px] cursor-pointer hover:shadow-2xl"
            >
              {toggleText}
            </button>
          )}
          {/* <button
            type="submit"
            className="w-1/3 bg-black text-white p-2 rounded-[8px] cursor-pointer hover:shadow-2xl"
          >
            {toggleText}
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default CreateEventForm;
