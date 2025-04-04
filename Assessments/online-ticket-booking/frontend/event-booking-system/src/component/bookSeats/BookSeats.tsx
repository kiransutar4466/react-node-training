import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFetchSeatSuccess } from "../../pages/shows/showsSlice";
import { toast } from "react-toastify";

const BookSeats = ({ handleSeatBookingCB, data, isBookSeatLoading,closeModal }: any) => {
  const { showTotalTickets, showSelectedTickets, event } = data && data;
  const dispatch = useDispatch();

  let selectedSeats = data && showSelectedTickets;
  const totalSeats =
    data && Array.from({ length: showTotalTickets }, (_, index) => index + 1);

  const [userSelectedSeats, setUserSelectedSeats] = useState<number[]>([]);

  let amoutPaid = selectedSeats && userSelectedSeats.length * event.eventPrice;

  const handleSeatSelection = (seat: number) => {
    if (selectedSeats.includes(seat)) return;

    setUserSelectedSeats((prevSeats) =>
      prevSeats.includes(seat)
        ? prevSeats.filter((s) => s !== seat)
        : [...prevSeats, seat]
    );
  };

  const handleSeatBooking = () => {
    const payload = {
      selectedTickets: userSelectedSeats,
      amoutPaid: amoutPaid,
    };
    if (userSelectedSeats.length <= 0) {
      toast.error("Please select atleast one seat ");
    } else {
      handleSeatBookingCB(payload);
    }
  };

  useEffect(() => {
    return () => {
      const data: any = [];
      dispatch(setFetchSeatSuccess(data));
      selectedSeats = [];
    };
  }, []);

  return (
    <div className="w-[1000px]  bg-white p-4 rounded-[12px]">
      <div className="relative">
      <p className="text-center ">Select seats</p>
        <div className=" flex gap-4">
          <div className="flex gap-1  items-center">
            <p className="bg-green-500 h-3 w-3"></p>
            <p className="text-[14px]"> Available</p>
          </div>

          <div className="flex gap-1  items-center">
            <p className="bg-red-500 h-3 w-3"></p>
            <p className="text-[14px]"> Booked</p>
          </div>
          <div className="flex gap-1 items-center">
            <p className="bg-gray-500 h-3 w-3"></p>
            <p className="text-[14px]"> Selected</p>
          </div>
        </div>
       
        <p className="absolute top-[0px] right-[10px] cursor-pointer" onClick={()=>closeModal()}>X</p>
      </div>

      <div className="w-[100%]  grid grid-cols-12 gap-4  items-center justify-center mt-3 p-4">
        {isBookSeatLoading&&"loading"}
        {totalSeats &&
          totalSeats.map((seat: any, index: any) => (
            <div
              key={index}
              className={`${
                selectedSeats.includes(seat)
                  ? "bg-red-600"
                  : userSelectedSeats.includes(seat)
                  ? "bg-gray-500"
                  : "bg-green-500"
              }  h-12 w-12 flex items-center justify-center text-white font-bold rounded-md shadow-md`}
              onClick={() => handleSeatSelection(seat)}
            >
              {seat}
            </div>
          ))}
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center bg-[#f6f5f5]  p-4 rounded-lg mt-4  mb-2">
        {/* Selected Seats */}
        <div className="flex gap-2 items-center ">
          <p className="font-semibold">Selected seat no.:</p>
          {userSelectedSeats.length > 0 ? (
            <div className="flex gap-2 flex-wrap w-[400px]">
              {userSelectedSeats.map((seat) => (
                <p
                  key={seat}
                  className="bg-gray-500 text-white px-2 py-1 rounded"
                >
                  {seat}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">None</p>
          )}
        </div>

        {/* Amount per seat */}
        <div className="flex gap-2 items-center">
          <p className="font-semibold">Amount per seat:</p>
          <p className="text-green-600 font-bold">
            ₹{event && event.eventPrice}
          </p>
        </div>

        {/* Total Amount */}
        <div className="flex gap-2 items-center">
          <p className="font-semibold">Total amount:</p>
          <p className="text-red-600 font-bold">₹{amoutPaid}</p>
        </div>
      </div>

      <div className=" flex items-center justify-end">
        {isBookSeatLoading ? (
          <button className="bg-black text-white p-3 w-[30%] rounded cursor-pointer mt-4 book-tickets-btn">
            loading
          </button>
        ) : (
          <button
            onClick={handleSeatBooking}
            className="bg-black text-white p-3 w-[30%] rounded cursor-pointer mt-4 book-tickets-btn"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default BookSeats;
