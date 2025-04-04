import { MdDateRange } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEventById } from "../../component/createEventForm/createEventSaga";
import { RootState } from "../../store/store";
import moment from "moment";
import { setEventDetailsSuccess } from "../../component/createEventForm/eventDetailsFetchSlice ";

import { getShowsByid } from "../shows/showsSaga";
import { IoMdArrowRoundBack } from "react-icons/io";
import Loader from "../../component/Loader";


const ViewMoreEventDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { event,isLoading } = useSelector((state: RootState) => state.eventById);
  const [showNodal, setShowModal] = useState(false);
  const { id } = useParams();

  // const handleNavigateBack = () => {
  //   navigate(-1);
  // };

  const handleNaviagte = () => {
    // const token=localStorage.getItem('token')
    // if(token){

    // const payload = {
    //       eventId: Number(id),
    //       eventShowDate: "",
    //     };
    
    //     dispatch(getShowsByid(payload));

    navigate(`/shows/${id}`);

    
    // }else{
    //   navigate('/login')
    //   toast.error("please login to book tickets")
    // }
  };

  useEffect(() => {
    const payload = {
      id: id,
      setShowModal: setShowModal,
    };

    dispatch(getEventById(payload));
   
    return () => {
      dispatch(setEventDetailsSuccess([]));
    };
  }, [id]);


    // useEffect(() => {
    //   const payload = {
    //     eventId: Number(id),
    //     eventShowDate: "",
    //   };
  
    //   dispatch(getShowsByid(payload));
    // }, [id, ]);
  console.log("da", event);

  return (
    <div
      className={`  main-view-details bg-[#ffffff80] `}
      // style={{
      //   backgroundImage: `linear-gradient(rgba(119, 119, 119, 0.684), rgba(92, 92, 92, 0.782)), url(${background})`,
      // }}
    >


{isLoading&&<Loader/>}
      <div className="mt-8 w-[100%] mx-auto  rounded-[8px] flex justify-center items-center  ">
     
        <div className="w-[80%] dash-board-card    mx-auto view-details  ">
          <p className="mb-2 cursor-pointer " onClick={()=>navigate(-1)}>
              <IoMdArrowRoundBack size={20} />
          </p>
          <div className=" w-[100%] h-[300px] overflow-hidden rounded-[15px] mx-auto bg-white   ">
            <img
              src={event ? event.eventImage : ""}
              alt=""
              className="w-[100%] aspect-[2/1]"
            />
          </div>
          <div className="flex gap-4">
            {/* left div */}
            <div className="w-[60%] p-2">
              <div className="flex justify-between items-center">
                <p className="mt-2 fontsize-forEvnetName">
                  {event ? event.eventName : ""}
                </p>
              </div>

              <p className=" mt-2">
                <span> Category :</span>
                <span className="italic-text">
                  {event ? event.eventCategory : ""}
                </span>
              </p>

              <span>Event details</span>
              <p className="fontsize-forEventDescription">
                {event ? event.eventDescription : ""}
              </p>
            </div>
            {/* Right Div */}
            <div className="w-[40%] p-4">
              <div className="mb-1">
                <span>Ticket price</span>{" "}
                <p className="text-[20px] font-bold">
                ₹{event ? event.eventPrice : ""}
                </p>
              </div>
              <p>Starting from</p>
              <div className="comman-fontSize w-60 bg-[#e2e2e2] rounded-[8px] p-1 px-2 mt-1">
                <p className="flex gap-2 justify-center items-center">
                  <MdDateRange />
                  <span>
                    {event
                      ? moment(event.eventStartDate).format("MMMM ,Do, YYYY")
                      : ""}
                  </span>
                </p>
              </div>
              <div className="flex ">
                <button
                  className="bg-black text-white p-3 w-[100%] rounded-[12px] cursor-pointer mt-4 book-tickets-btn"
                  onClick={() => handleNaviagte()}
                >
                  Book Tickets
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMoreEventDetails;
