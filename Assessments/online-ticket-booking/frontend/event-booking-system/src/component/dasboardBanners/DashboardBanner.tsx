import { useEffect, useState } from "react";
import { dashboardImages } from "../../constant/allImages";

const DashboardBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % dashboardImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [dashboardImages]);


  return (
    <div>
      <div className=" w-full bg-gray-200 bg-cover bg-center bg-no-repeat overflow-hidden ">
        <img

          src={dashboardImages[currentIndex]}
          alt=""
          className="w-[100%] aspect-[3]"
        />
      </div>
    </div>
  );
};

export default DashboardBanner;
