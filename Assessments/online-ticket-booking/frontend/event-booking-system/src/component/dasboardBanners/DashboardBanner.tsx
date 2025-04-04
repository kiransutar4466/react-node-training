import { useEffect, useState } from "react";
import { dashboardImages } from "../../constant/allImages";

const eventData = [
  {
    image: dashboardImages[0],
    title: "Book Tickets for",
    subtitle: "Music Events in Pune",
    description:
      "Music signifies the vibrant energy of the place! Such music events in Pune make the city alive throughout the year. From live music shows and concerts to karaoke nights and gigs at bars and cafes, music fills the silence beautifully in Pune.",
  },
  {
    image: dashboardImages[1],
    title: "Discover the Best",
    subtitle: "Comedy Shows in Pune",
    description:
      "Get ready for a night full of laughter and entertainment! Pune hosts the best stand-up comedy shows, open mic nights, and comedy festivals to keep you rolling with laughter.",
  },
  {
    image: dashboardImages[2],
    title: "Experience Thrilling",
    subtitle: "Sports Events in Pune",
    description:
      "Be part of the excitement! Pune offers thrilling sports events, from football tournaments to marathons, giving sports enthusiasts an adrenaline rush.",
  },
];

const DashboardBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % eventData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div
        className="flex items-center w-full h-[calc(100vh_-_3.7rem)] bg-gray-200 bg-cover bg-center bg-no-repeat overflow-hidden transition-all duration-500 "
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,0)), url(${eventData[currentIndex].image})`,
        }}
      >
        <div className="w-[100%] md:w-[40%]  bg-[#76494900] mx-10 md:mt-50  md:mx-30 transition-opacity duration-500 shows-card">
          <p className="text-[3rem] font-bold text-white">
            {eventData[currentIndex].title}
          </p>
          <p className="text-[1.4rem] font-bold text-white">
            {eventData[currentIndex].subtitle}
          </p>
          <p className="text-white text-[12px] mt-2">
            {eventData[currentIndex].description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardBanner;
