import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserTickets = () => {
  const naviagte = useNavigate();

  const [tickets] = useState([
    {
      id: 1,
      eventName: "Music Concert",
      eventDate: "2025-04-15",
      venue: "Madison Square Garden, NY",
      seatNumber: "A12",
    },
    {
      id: 2,
      eventName: "Football Match",
      eventDate: "2025-05-10",
      venue: "Wembley Stadium, London",
      seatNumber: "B45",
    },
    {
      id: 3,
      eventName: "Tech Conference",
      eventDate: "2025-06-20",
      venue: "Silicon Valley, CA",
      seatNumber: "VIP-5",
    },
  ]);

  const handleDownload = (ticketId: any) => {
    alert(`Downloading ticket: ${ticketId}`);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto p-6">
        <div>
          <button
            onClick={() => naviagte("/")}
            className="mt-3 cursor-pointer  bg-gray-300 text-black px-4 py-2 rounded-md transition"
          >
            back to home
          </button>
        </div>
      </div>
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-center mb-6">My Tickets</h2>
        {tickets.length === 0 ? (
          <p className="text-center text-gray-500">No tickets purchased yet.</p>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white p-4 shadow-md rounded-lg border border-gray-200"
              >
                <h3 className="text-lg font-semibold">{ticket.eventName}</h3>
                <p className="text-gray-600">
                  <strong>Date:</strong> {ticket.eventDate}
                </p>
                <p className="text-gray-600">
                  <strong>Venue:</strong> {ticket.venue}
                </p>
                <p className="text-gray-600">
                  <strong>Seats:</strong> {ticket.seatNumber}
                </p>
               
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default UserTickets;
