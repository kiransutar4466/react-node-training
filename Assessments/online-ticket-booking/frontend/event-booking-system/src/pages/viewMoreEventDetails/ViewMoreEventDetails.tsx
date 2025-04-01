import { MdDateRange } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import background from "../../assets/backgroundBanner1.png";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEventById } from "../../component/createEventForm/createEventSaga";
import { RootState } from "../../store/store";
import moment from 'moment';
import { setEventDetailsSuccess } from "../../component/createEventForm/eventDetailsFetchSlice ";

const ViewMoreEventDetails = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const {event}=useSelector((state:RootState)=>state.eventById)
  const [showNodal,setShowModal]=useState(false)
  const {id}=useParams()

 

  const handleNaviagte = () => {
    // const token=localStorage.getItem('token')
    // if(token){
    navigate(`/shows/${id}`);
    // }else{
    //   navigate('/login')
    //   toast.error("please login to book tickets")
    // }
  };

  useEffect(()=>{
    const payload = {
      id: id,
      setShowModal: setShowModal,
    };
   
      dispatch(getEventById(payload))
   
      return()=>{
        dispatch(setEventDetailsSuccess([]))
      }
       
  },[id])
console.log("da",event)

  return (
    <div
      className={`h-[100vh] p-4 main-view-details bg-[#c4b9b980] `}
      // style={{
      //   backgroundImage: `linear-gradient(rgba(119, 119, 119, 0.684), rgba(92, 92, 92, 0.782)), url(${background})`,
      // }}
    >
      <div className="h-[96vh] w-[100%] mx-auto  rounded-[8px] flex justify-center items-center  ">
        <div className="w-[80%]  mx-auto view-details  ">
          <div className=" w-[100%] h-[500px] overflow-hidden rounded-[15px] mx-auto bg-white   ">
            <img src={event?event.eventImage:""} alt="" className="w-[100%] aspect-[2/1]" />
          </div>
          <div className="flex gap-4">
            {/* left div */}
            <div className="w-[50%] p-2">
              <div className="flex justify-between items-center">
                <p className="mt-2 fontsize-forEvnetName">{event?event.eventName:''}</p>
              </div>
             
              <p className="fontsize-forEventDescription mt-2">
                Category : <span className="italic-text">{event?event.eventCategory:''}</span>
              </p>

              <span>Event details</span>
              <p className="fontsize-forEventDescription">
              {event?event.eventDescription:''}
              </p>
            </div>
          {/* Right Div */}
            <div className="w-[50%] p-4">
              <div className="mb-1">
               <span>Ticket price</span>  <p className="text-[20px] font-bold">${event?event.eventPrice:''}</p>
              </div>
              <p>Starting from</p>
              <div className="comman-fontSize w-60 bg-[#e2e2e2] rounded-[8px] p-1 px-2 mt-1">
                <p className="flex gap-2 justify-center items-center">
                  <MdDateRange />
                  <span>{event? moment(event.eventStartDate).format('MMMM ,Do, YYYY'):''}</span>
                </p>
              </div>
            <div className="flex ">
            <button
              className="bg-black text-white p-3 w-[70%] rounded-[12px] cursor-pointer mt-4 book-tickets-btn"
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
