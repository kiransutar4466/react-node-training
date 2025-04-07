import moment from 'moment';
import { FaCalendarAlt, FaCalendarTimes } from 'react-icons/fa';
import MuiButton from '../buttons/MuiButton';

const EventDetailsScreen = ( {eventData ,closeModalCB}: any) => {

  const data=eventData


  return (
    <div className=" bg-white p-4 w-[100%] text-black flex flex-col items-center overflow-hiddeb  relative rounded-2xl">

      <div className="w-full  space-y-4 overflow-hidden rounded-2xl  ">
      <div className=" w-[100%] bg-[gray] ">
            <img src={data.eventImage} className="w-[100%] h-[25vh]" alt="" />
      </div>
        <div className="bg-white   p-6 rounded-lg  ">
         
          <div className="">
          <h1 className="text-2xl font-semibold mb-2 text-center">  <span className="text-gray-600">{data.eventName}</span></h1>
          
          
          </div>
          <div className="mb-2">
            <h2 className="text-black text-center inline-block">
            <span className="text-gray-600">{data?.eventDescription&&data.eventDescription.substring(0,40)}..</span>
            </h2>
            
          </div>
          <div className="mb-1">
            <h2 className="text-black font-semibold inline-block">
            <FaCalendarAlt />
            </h2>{" "}
            <span className="text-gray-600">{ moment(data.eventStartDate).subtract(10, 'days').calendar()}</span>
          </div>
          <div className="mb-1">
            <h2 className="text-black font-semibold inline-block"><FaCalendarTimes /></h2>{" "}
            <span className="text-gray-600">{ moment(data.eventEndDate).subtract(10, 'days').calendar()}</span>
          </div>
          <div className="mb-1">
            <h2 className="text-black font-semibold inline-block">Price:</h2>{" "}
            <span className="text-gray-600">₹{data.eventPrice}</span>
          </div>
          <div>
            <h2 className="text-black font-semibold inline-block">Seats:</h2>{" "}
            <span className="text-gray-600">{data.eventTotalSeats}</span>
          </div>
        </div>
       
      
      </div>
    </div>
  );
};

export default EventDetailsScreen;
