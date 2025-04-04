import { useEffect, useMemo, useState } from "react";
import Dates from "../../component/dates/Dates";
import Modal from "../../component/modal/Modal";

import BookSeats from "../../component/bookSeats/BookSeats";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAvailableSeats, getShowsByid } from "./showsSaga";
import { RootState } from "../../store/store";
import { getEventById } from "../../component/createEventForm/createEventSaga";
import Timeings from "../../component/timeings/Timeings";


import { jwtDecode, JwtPayload } from "jwt-decode";
import { bookSeats } from "./bookSeatsSaga";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";
import { BASE_URL } from "../../services/baseUrl";
import { CircularProgress, LinearProgress } from "@mui/material";

const Shows = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isBookSeatLoading } = useSelector(
    (state: RootState) => state.bookSeats
  );
  const { loading, shows, seats } = useSelector(
    (state: RootState) => state.shows
  );
  const { event } = useSelector((state: RootState) => state.eventById);
  const eventData = event;
  const [showSeatBookingModal, setShowSeatBookingModal] = useState(false);



  const [showsData, setShowsData] = useState<any>([]);

  const uniqueShowDates = useMemo(() => {
    return [...new Set(showsData.map((show: any) => show.showDate))];
  }, [showsData]);

    const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const [showID, setShowID] = useState(null);
  const [showNodal, setShowModal] = useState(false);

  const handleShowSeatBookingModal = (id: any) => {
    setShowID(id);
    const payload = {
      id: id,
      setShowSeatBookingModalCB: setShowSeatBookingModal((prev) => !prev),
    };
    dispatch(getAvailableSeats(payload));
  };

  const handleSeatBooking = async (data: any) => {
    const { selectedTickets, amoutPaid } = data;
    const token: any = localStorage.getItem("token");
    if (token) {
      const decoded: JwtPayload & { user_id?: number } = jwtDecode(token);
      const payload = {
        userId: decoded.user_id,
        eventId: Number(id),
        showId: showID,
        selectedTickets: selectedTickets,
        amoutPaid: amoutPaid,
        closeModal: setShowSeatBookingModal(false),
        navigate: navigate,
      };
      dispatch(bookSeats(payload));
    }
  };

  const handleGetSeletedDate = (date: any) => {
    setSelectedDate(date);


    const payload = {
      eventId: Number(id),
      eventShowDate: date,
    };
    dispatch(getShowsByid(payload));
  };

  const handleCloseSeatBookingModal = () => {
    setShowSeatBookingModal(false);
  };

  useEffect(() => {
    const payload = {
      id: id,
      setShowModal: setShowModal,
    };
    dispatch(getEventById(payload));
  }, [id]);

  useEffect(() => {

    const fun = async () => {
      const payload = {
        eventId: Number(id),
        eventShowDate: "",
      };
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/shows/?eventId=${payload.eventId}&eventShowDate=${payload.eventShowDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      setShowsData(response?.data?.data);
  
      // setSelectedDate(response?.data?.data[0].showDate)
    };
    fun();
  }, []);
  

  console.log("unique",uniqueShowDates[0])
  return (
    <div className="h-screen p-6 bg-gray-50">
      {/* Back Button */}
      <div className="w-[80%] mx-auto flex items-center mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 transition cursor-pointer"
        >
          <IoMdArrowRoundBack size={24} className="mr-1" />
          {/* <span className="text-lg font-semibold">Back</span> */}
        </button>
      </div>

      <div className="w-[80%] mx-auto flex gap-2 overflow-x-auto p-2 bg-white rounded-lg shadow-md">
    
          <Dates
            selectedDate={selectedDate}
            date={uniqueShowDates}
            handleGetSeletedDateCB={handleGetSeletedDate}
          />
      
      </div>

      <div className="flex flex-col lg:flex-row w-[80%] mx-auto gap-8 mt-6">
        <div className="bg-white rounded-lg border shadow-md p-6 flex flex-col items-center text-center shows-card">
          <div className="h-72 w-72 overflow-hidden rounded-lg ">
            <img
              src={eventData?.eventImage}
              className="h-full w-full object-cover"
              alt="Event"
            />
          </div>
          <h2 className="text-xl font-bold mt-4">{eventData?.eventName}</h2>
          <p className="text-gray-500">{eventData?.eventCategory}</p>
        </div>

        <div className="bg-white flex flex-wrap  overflow-hidden overflow-x-auto rounded-lg shadow-md p-6 w-[80%]">
          {loading?
            <div className="flex justify-center items-center w-[100%]">

                        <CircularProgress size={50}/>

            </div>: selectedDate ? (
            <Timeings
              times={shows}
              loading={loading}
              handleShowSeatBookingModalCB={handleShowSeatBookingModal}
            />
          ) : (
            <div className="text-center text-gray-600 w-[100%] flex justify-center items-center">
              <p className="text-lg text-center font-semibold">
                Please select a date to view available time slots.
              </p>
            </div>
          )
          }
         
        </div>
      </div>

      {showSeatBookingModal && (
        <Modal
          closeModalCB={handleCloseSeatBookingModal}
          component={
            <BookSeats
              data={seats}
              isBookSeatLoading={isBookSeatLoading}
              closeModal={handleCloseSeatBookingModal}
              handleSeatBookingCB={handleSeatBooking}
            />
          }
        />
      )}
    </div>
  );
};

export default Shows;
