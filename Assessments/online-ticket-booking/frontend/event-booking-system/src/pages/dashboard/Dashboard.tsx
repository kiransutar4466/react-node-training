import DisplayAllEvents from "../displayAllEvents/DisplayAllEvents";



import DashboardBanner from "../../component/dasboardBanners/DashboardBanner";
import Footer from "../../component/footer/Footer";


const Dashboard = () => {
  return (
    <>
     
      <div className="w-[100%]  border-[0px]   ">
      <DashboardBanner/>
      </div>

      

      <DisplayAllEvents />
 
      <Footer/>
    </>
  );
};

export default Dashboard;
