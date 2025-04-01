
const EventDetailsScreen = ( {eventData ,closeModalCB}: any) => {

  const data=eventData


  return (
    <div className=" bg-white text-black flex flex-col items-center p-8 relative">

      <div className=" w-full max-w-2xl space-y-4">
        <div className="bg-white   p-6 rounded-lg ">
          <div className=" w-[100%] bg-[gray] rounded-[12px]">
            <img src={data.eventImage} className="w-[100%] h-[25vh]" alt="" />
          </div>
          <div className="mb-2 mt-4">
          <h1 className="text-2xl font-semibold mb-2 text-center">  <span className="text-gray-600">{data.eventName}</span></h1>
          
          
          </div>
          <div className="mb-2">
            <h2 className="text-black text-center inline-block">
            <span className="text-gray-600">{data?.eventDescription&&data.eventDescription.substring(0,40)}..</span>
            </h2>
            
          </div>
          <div className="mb-1">
            <h2 className="text-black font-semibold inline-block">
              Start Date:
            </h2>{" "}
            <span className="text-gray-600">{data.eventStartDate}</span>
          </div>
          <div className="mb-1">
            <h2 className="text-black font-semibold inline-block">End Date:</h2>{" "}
            <span className="text-gray-600">{data.eventEndDate}</span>
          </div>
          <div className="mb-1">
            <h2 className="text-black font-semibold inline-block">Price:</h2>{" "}
            <span className="text-gray-600">${data.eventPrice}</span>
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
