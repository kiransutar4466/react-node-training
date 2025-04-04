import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { GiTicket } from "react-icons/gi";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6 md:px-16">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        
 
        <div className="text-center md:text-left w-full md:w-1/3">
          <h2 className="text-3xl font-bold text-white flex gap-2"><GiTicket size={30} className="text-yellow-400" />    Prime Seat</h2>
          <p className="text-gray-400 mt-3">
            Book your favorite events effortlessly and enjoy exclusive experiences.
          </p>
        </div>

   
        <nav className="flex flex-col text-center md:text-left gap-3 w-full md:w-1/3">
          <h3 className="text-lg font-semibold text-gray-300">Quick Links</h3>
          <a href="#" className="text-gray-400 hover:text-white transition">Home</a>
          {/* <a href="#" className="text-gray-400 hover:text-white transition">Events</a>
          <a href="#" className="text-gray-400 hover:text-white transition">About Us</a>
          <a href="#" className="text-gray-400 hover:text-white transition">Contact</a> */}
        </nav>

      
        <div className="flex flex-col gap-3 w-full md:w-1/3 text-center md:text-left">
          <h3 className="text-lg font-semibold text-gray-300">Contact Us</h3>
          <p className="flex items-center gap-2 text-gray-400">
            <FaMapMarkerAlt size={18} /> 123 Event Street, New York, USA
          </p>
          <p className="flex items-center gap-2 text-gray-400">
            <FaPhone size={18} /> +1 (234) 567-890
          </p>
          <p className="flex items-center gap-2 text-gray-400">
            <FaEnvelope size={18} /> support@primeseat.com
          </p>
        </div>
      </div>


      <div className="border-t border-gray-700 my-6"></div>


      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
   
        <div className="flex gap-5">
          <a href="#" className="text-gray-400 hover:text-white transition">
            <FaFacebookF size={22} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <FaInstagram size={22} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <FaTwitter size={22} />
          </a>
        </div>

       
        <div className="text-gray-500 text-sm text-center">
          &copy; {new Date().getFullYear()} Event Booking. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
