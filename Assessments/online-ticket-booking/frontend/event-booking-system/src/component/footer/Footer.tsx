const Footer = () => {
    return (
      <footer className="bg-black text-white py-8 px-4 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-2xl font-semibold">Event Booking</h2>
            <p className="text-gray-400 mt-2">Book your favorite events effortlessly.</p>
          </div>
  
          <nav className="flex flex-wrap justify-center gap-6 md:gap-12 text-gray-300">
            <a href="#" className="hover:text-white transition">Home</a>
          
          </nav>
        </div>
  
        <div className="mt-6 text-center text-gray-500 text-sm border-t border-gray-700 pt-4">
          &copy; {new Date().getFullYear()} Event Booking. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  