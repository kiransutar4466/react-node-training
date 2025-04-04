import moment from "moment";

const TicketList = ({ ticketData }:any) => {
  return (
    <div className="space-y-6 ">
      {ticketData.map((ticket:any) => (
        <div
          key={ticket.id}
          className="p-4 relative bg-white shadow-md border border-gray-300 rounded-lg overflow-hidden "
        >
         
          <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 h-10 w-5 rounded-r-full"></div>

        
          <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 h-10 w-5 rounded-l-full"></div>

          <div className="p-5">
         
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {ticket?.event?.eventName}
            </h3>

      
            <p className="text-gray-600 text-sm">
              <strong className="text-gray-700">Booked at: </strong>
              {moment(ticket?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
            </p>

        
            <p className="text-gray-600 text-sm">
              <strong className="text-gray-700">Show Date: </strong>
              {moment(ticket?.show?.showDate).subtract(10, "days").calendar()}
            </p>

        
            <div className="mt-3">
              <strong className="text-gray-700">Seats:</strong>
              <div className="flex flex-wrap gap-2 mt-1">
                {ticket.ticketNumbers.map((num:any) => (
                  <span
                    key={num}
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-sm font-semibold px-3 py-1 rounded-md shadow-sm"
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>

        
            <p className="text-gray-700 text-lg font-semibold mt-3">
              <strong className="text-gray-900">Amount Paid: ₹</strong>{" "}
              {ticket.amoutPaid}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketList;
