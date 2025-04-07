
import LinearProgress from "@mui/material/LinearProgress";
import EventDisplayCard from "../eventDispalyCards/EventDisplayCard";
import NoDataFound from "../no-data-found/NoDataFound";




const EventGrid = ({ data, loading, heading, handleNavigation }:any) => {

  return (
    <div className="bg-[#f6f5f5]">

      <div className="w-[80%] mx-auto">
      {loading ? <LinearProgress className="w-[50%]" /> : <div />}
      <div className="flex items-center justify-between my-4 p-5   ">
       
        <h2 className="text-[1.8rem]  mx-4 text-[black] font-black  mt-2">{heading}</h2>
       
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6 ">
        {data && data?.length >= 0? (
          data?.map((item:any, index:any) => (
            <EventDisplayCard
              key={index}
              id={item.id}
              eventName={item.eventName}
              eventDescription={item.eventDescription}
              eventCategory={item.eventCategory}
              eventImage={item.eventImage}
              handleNavigationCB={handleNavigation}
            />
          ))
        ) : (
          <NoDataFound text="No events found" />
        )}
      </div>
      </div>
    </div>
  );
};

export default EventGrid;
