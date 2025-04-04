import { useEffect, useState } from "react";
import Button from "../../component/buttons/Button";
import Modal from "../../component/modal/Modal";
import Table from "../../component/Table";
import CreateEventForm from "../../component/createEventForm/CreateEventForm";
import EventDetailsScreen from "../../component/eventDetailsScreen/EventDetailsScreen";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEvent,
  getEventById,
} from "../../component/createEventForm/createEventSaga";
import { RootState } from "../../store/store";
import { useDebounceHook } from "../../utils/useDebounceHook";
import { getAllEvents } from "../displayAllEvents/getAllEventsSaga";
import { categories } from "../../constant/createEventConstant";
import Pagination from "../../component/pagination/Pagination";
import { EventData } from "../../types/types";

const tableHead = [
  "Sr no.",
  "Event Name",
  "Description",
  "Start Date",
  "End Date",
  "Price",
  "Total Seats",
];

const ManageEvents = () => {
  const dispatch = useDispatch();

  const { event } = useSelector((state: RootState) => state.eventById);
  const { data,loading } = useSelector((state: any) => state.getAllEvents);

  const [eventData, setEventData] = useState<EventData>(
    event
      ? {
          userId: null,
          eventName: event.eventName,
          eventDescription: event?.eventDescription,
          eventCategory: event?.eventCategory,
          eventStartDate: event?.eventStartDate,
          eventEndDate: event?.eventEndDate,
          eventTotalSeats: event?.eventTotalSeats,
          eventImage: event?.eventImage,
          eventPrice: event?.eventPrice,
          eventSlots: event?.eventSlots,
        }
      : {
          userId: null,
          eventName: "",
          eventDescription: "",
          eventCategory: "",
          eventStartDate: null,
          eventEndDate: null,
          eventTotalSeats: null,
          eventImage: null,
          eventPrice: null,
          eventSlots: [],
        }
  );

  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDispalyModal] = useState(false);
  const [seacrhText, setSearchText] = useState("");
  const [selectedCategory, setSselectedCategory] = useState("");
  const [toggleText, setToggleText] = useState("");
  const [nextPage, setNextPage] = useState(1);

  const debounceValue = useDebounceHook(seacrhText);
  console.log("dex",data)
  const handleModal = (id: number) => {
    if (id && !isNaN(id)) {
      setToggleText("Update Event");
      const payload = {
        id: id,
        setShowModal: setShowModal,
      };
      dispatch(getEventById(payload));
    } else {
      setEventData({
        userId: null,
        eventName: "",
        eventDescription: "",
        eventCategory: "",
        eventStartDate:null,
        eventEndDate:null,
        eventTotalSeats: null,
        eventImage: null,
        eventPrice: null,
        eventSlots: [],
      });

      setToggleText("Create Event");
      setTimeout(() => {
        setShowModal((prev) => !prev);
      }, 220);
    }
  };

  const handleDisaplyModalToggle = (id: any) => {
    setShowDispalyModal((prev) => {
      if (!prev) {
        const payload = {
          id: id,
          setShowModal: setShowDispalyModal,
        };
        dispatch(getEventById(payload));

        return prev;
      } else {
        return false;
      }
    });
  };
  const handleDelete = (id: number) => {
    dispatch(deleteEvent(id));
  };





  useEffect(() => {
    const payload = {
      eventName: debounceValue || '',
      eventCategory: selectedCategory || '',
      eventStartDate: '',
      eventEndDate: '',
      nextPage: nextPage || 1,
    };

    dispatch(getAllEvents(payload));
  }, [debounceValue, selectedCategory, nextPage]);


  useEffect(() => {
    if (event) {
      setEventData({
        userId: event.userId,
        eventName: event.eventName,
        eventDescription: event.eventDescription,
        eventCategory: event.eventCategory,
        eventStartDate: event.eventStartDate ? event.eventStartDate.split("T")[0] : "", 
        eventEndDate: event.eventEndDate ? event.eventEndDate.split("T")[0] : "", 
        eventTotalSeats: event.eventTotalSeats,
        eventImage: event.eventImage,
        eventPrice: event.eventPrice,
        eventSlots: event.eventSlots,
      });
    }
  }, [event]);
  


  return (
    <div className="p-6">
      <div className="flex justify-between max-w-5xl mx-auto mt-4">
        <input
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search events by name"
          className="border rounded-xl px-4 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex gap-4">
          <select
            onChange={(e) => setSselectedCategory(e.target.value)}
            className="border rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <option value="All">Select Category</option>
            {categories?.map((cate) => (
              <>
                <option value={cate}>{cate}</option>
              </>
            ))}
          </select>

          <Button
            text="Create Event"
            onClickCB={() => handleModal(0)}
            bgColor="bg-red-500"
            textColor="text-white"
            icon=""
          />
        </div>
      </div>

      <div className="max-w-1/1 mx-auto mt-6">
        <Table
          loading={loading}
          rows={data?.data}
          cols={tableHead}
          openModalCB={handleModal}
          toggleShowDetails={handleDisaplyModalToggle}
          deletDataCB={handleDelete}
        />
      </div>
      <div>
        <Pagination nextPageNuber={nextPage} setNextPageNumber={setNextPage} hasNext={data?.pagination}/>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal
          closeModalCB={handleModal}
          component={
            <CreateEventForm
              toggleText={toggleText}
              closeModalCB={handleModal}
              eventData={eventData}
              setEventData={setEventData}
            />
          }
        />
      )}
      {showDetailsModal && (
        <Modal
          closeModalCB={handleDisaplyModalToggle}
          component={
            <EventDetailsScreen
              eventData={event}
              closeModalCB={handleDisaplyModalToggle}
            />
          }
        />
      )}
    </div>
  );
};

export default ManageEvents;
