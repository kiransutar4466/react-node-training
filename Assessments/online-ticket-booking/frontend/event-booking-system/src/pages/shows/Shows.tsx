import { useEffect, useState } from "react";
import Dates from "../../component/dates/Dates";
import Modal from '../../component/modal/Modal';
import LinearProgress from '@mui/material/LinearProgress';
import BookSeats from "../../component/bookSeats/BookSeats";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAvailableShows, getShowsByid } from "./showsSaga";
import { RootState } from "../../store/store";
import { getEventById } from "../../component/createEventForm/createEventSaga";

const Shows = () => {
      const {id}=useParams()
      const dispatch=useDispatch()
      const {loading,shows}=useSelector((state:RootState)=>state.shows)
      const {event}=useSelector((state:RootState)=>state.eventById)
  const [showSeatBookingModal,setShowSeatBookingModal]=useState(false)
 
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [showNodal,setShowModal]=useState(false)


  const handleShowSeatBookingModal=()=>{
    setShowSeatBookingModal(prev=>!prev)

    const payload={
        eventId:"",
        showId:"",
        showTime:""
    }
    dispatch(getAvailableShows(payload))
  }

  const handleGetSeletedDate = (date: any) => {
    console.log("showId",date)
    setSelectedDate(date);
  };


  useEffect(()=>{
    const payload={
      eventId:Number(id),
      eventShowDate:selectedDate
    }
   
      dispatch(getShowsByid(payload))
    
   
  },[id,selectedDate])

  //  useEffect(()=>{
  //     const payload = {
  //       id: id,
  //       setShowModal: setShowModal,
  //     };
     
  //       dispatch(getEventById(payload))
     
         
  //   },[id])

   
  return (
    <div className="h-[100vh] p-4 ">
      <div className="flex w-[70%] mx-auto overflow-hidden overflow-x-auto mt-4  ">
        <p>Selecte Date </p>
      </div>

      <div className="flex w-[70%] mx-auto overflow-hidden overflow-x-auto mt-2  ">
        {shows&&shows?.map((date:any) => (
             <Dates key={date} date={date} handleGetSeletedDateCB={handleGetSeletedDate} />
        ))}
      </div>
      <div className="flex w-[70%] gap-10 mx-auto">
        <div className="bg-white h-80 w-80 mt-10 imgage-div">
          <div className="bg-blue-400 h-80 w-80"></div>
          <p className="text-[16px] font-bold mt-1">Show Name</p>
        </div>

        <div className="mt-10 bg-gray-200 w-[100%]  p-4">
       {loading? <LinearProgress />:''}
          <p>Show Timeings</p>
          <div className="flex gap-4 flex-wrap mt-2">
            <div className="h-10 w-30 text-green-600 bg-white  flex justify-center items-center cursor-pointer" onClick={handleShowSeatBookingModal}>
              08:00 AM
            </div>
            <div className="h-10 w-30 text-green-600 bg-white  flex justify-center items-center cursor-pointer">
              08:00 AM
            </div>
          </div>
        </div>
      </div>
      {showSeatBookingModal&&<Modal closeModalCB={handleShowSeatBookingModal} component={<BookSeats/>}/>}
    </div>
  );
};

export default Shows;
