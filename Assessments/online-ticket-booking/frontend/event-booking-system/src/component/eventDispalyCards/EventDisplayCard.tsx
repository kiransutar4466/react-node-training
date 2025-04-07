

const EventDisplayCard = ({
  eventName,
  eventDescription,
  eventCategory,
  id,
  eventImage,
  handleNavigationCB,
}: any) => {

console.log("id",id)


  return (
    <div className="h-[380px] w-[280px] bg-white border rounded-2xl shadow-md p-4 flex flex-col relative dash-board-card">

<div className="h-[200px] w-full rounded-xl overflow-hidden cursor-pointer">
  <img
    src={eventImage}
    className="w-full h-full object-cover bg-gray-200 transition-transform duration-300 ease-in-out transform hover:scale-105"
    alt="Event"
  />
</div>


      {/* Event Details */}
      <div className="flex-1 mt-3 px-2">
        <p className="text-lg font-semibold line-clamp-1">{eventName}</p>
        <p className="text-sm text-gray-600 line-clamp-2">{eventDescription}</p>
      </div>

      {/* Button Section */}
      <button
        className="bg-black text-white text-[14px] py-2 rounded-xl w-[94%] absolute bottom-4 cursor-pointer left-2 right-4"
        onClick={() => handleNavigationCB(id)}
      >
        View More
      </button>
    </div>
  );
};

export default EventDisplayCard;
