import DisplayAllEvents from "../displayAllEvents/DisplayAllEvents";


import Navbar from "../../component/navBar/Navbar";
import DashboardBanner from "../../component/dasboardBanners/DashboardBanner";
import Footer from "../../component/footer/Footer";
const Dashboard = () => {
  return (
    <>
      <Navbar />

      <DashboardBanner/>

      <DisplayAllEvents />
      <Footer/>
    </>
  );
};

export default Dashboard;
