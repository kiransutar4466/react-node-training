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
import { categories1 } from "../../constant/createEventConstant";
import Pagination from "../../component/pagination/Pagination";
import { EventData } from "../../types/types";

import Breadcrumb from "../../component/breadcrumb/Breadcrumb";

import { IoFilter } from "react-icons/io5";
import CategoryFilter from "../../component/cateGoryFilter/CategoryFilter";

const tableHead = [
  "Sr no.",
  "Event Name",
  "Description",
  "Start Date",
  "End Date",
  "Price",
  "Total Seats",
];

const dataCate = {
  Category: categories1,
  Eventtype: ["ongoing", "upcoming", "past"],
};

const ManageEvents = () => {
  const dispatch = useDispatch();

  const { event } = useSelector((state: RootState) => state.eventById);
  const { data, loading } = useSelector((state: any) => state.getAllEvents);

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

  const [toggleText, setToggleText] = useState("");
  const [nextPage, setNextPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const debounceValue = useDebounceHook(seacrhText);

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
        eventStartDate: null,
        eventEndDate: null,
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

  // const handleDelete = (id: number) => {
  //   dispatch(deleteEvent(id));
  // };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmDelete) {
      dispatch(deleteEvent(id));
    }
  };

  const handleAdd = (selection: any) => {
    if (dataCate?.Eventtype.includes(selection.type)) {
      const payload = {
        eventName: "",
        eventCategory: "",
        eventStartDate: "",
        eventEndDate: "",
        nextPage: nextPage || 1,
        eventStatus: selection.type || "",
      };

      dispatch(getAllEvents(payload));
    } else {
      const payload = {
        eventName: "",
        eventCategory: selection.type || "",
        eventStartDate: "",
        eventEndDate: "",
        nextPage: nextPage || 1,
        eventStatus: "",
      };

      dispatch(getAllEvents(payload));
    }

    setIsFilterOpen(false);
  };

  useEffect(() => {
    const payload = {
      eventName: debounceValue || "",
      eventCategory:  "",
      eventStartDate: "",
      eventEndDate: "",
      nextPage: nextPage || 1,
      eventStatus: "",
    };

    dispatch(getAllEvents(payload));
  }, [debounceValue, nextPage]);

  useEffect(() => {
    if (event) {
      setEventData({
        userId: event.userId,
        eventName: event.eventName,
        eventDescription: event.eventDescription,
        eventCategory: event.eventCategory,
        eventStartDate: event.eventStartDate
          ? event.eventStartDate.split("T")[0]
          : "",
        eventEndDate: event.eventEndDate
          ? event.eventEndDate.split("T")[0]
          : "",
        eventTotalSeats: event.eventTotalSeats,
        eventImage: event.eventImage,
        eventPrice: event.eventPrice,
        eventSlots: event.eventSlots,
      });
    }
  }, [event]);

  return (
    <div className="">
      <Breadcrumb />
      <div className="flex justify-between  mx-auto mt-4">
        <div className="flex gap-4 relative">
          <input
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search events by name"
            className="border rounded-xl px-4 py-2  w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {/* <select
            
            className="border rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
          > */}
          {/* <option value="All">Category</option>
            {categories?.map((cate) => (
              <>
                <option value={cate}>{cate}</option>
              </>
            ))} */}
          {/* </select> */}
          <div
            className="h-10 w-10 bg-white rounded-xl p-2 border-1 flex justify-center items-center"
            onClick={() => setIsFilterOpen((prev) => !prev)}
          >
            <IoFilter />
          </div>
          {isFilterOpen && (
            <div className="absolute top-11 left-75">
              <CategoryFilter data={dataCate} onAdd={handleAdd} />
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <Button
            text="Create Event"
            onClickCB={() => handleModal(0)}
            bgColor="bg-red-500"
            textColor="text-white"
            icon=""
          />
        </div>
      </div>

      <div className="max-w-1/1 mx-auto mt-1">
        <Table
          loading={loading}
          rows={data?.data}
          cols={tableHead}
          openModalCB={handleModal}
          toggleShowDetails={handleDisaplyModalToggle}
          deletDataCB={handleDelete}
        />
      </div>
      <div className="flex justify-end">
        <Pagination
          nextPageNuber={nextPage}
          setNextPageNumber={setNextPage}
          hasNext={data?.pagination}
          totalPages={data?.pagination}
        />
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
