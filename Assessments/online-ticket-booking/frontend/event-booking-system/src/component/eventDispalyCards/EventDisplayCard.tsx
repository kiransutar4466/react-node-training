

const EventDisplayCard = ({
  eventName,
  eventDescription,
  eventCategory,
  id,
  eventImage,
  handleNavigationCB,
}: any) => {




  return (
    <div className="h-[380px] w-[280px] bg-white border rounded-2xl shadow-md p-4 flex flex-col relative">

      <div className="h-[200px] w-full rounded-xl overflow-hidden">
        <img
          src={eventImage}
         
          className="w-full h-full object-cover bg-gray-200"
        />
      </div>

      {/* Event Details */}
      <div className="flex-1 mt-3 px-2">
        <p className="text-lg font-semibold line-clamp-1">{eventName}</p>
        <p className="text-sm text-gray-600 line-clamp-2">{eventDescription}</p>
      </div>

      {/* Button Section */}
      <button
        className="bg-black text-white py-2 rounded-xl w-[94%] absolute bottom-4 left-2 right-4"
        onClick={() => handleNavigationCB(id)}
      >
        View More
      </button>
    </div>
  );
};

export default EventDisplayCard;
