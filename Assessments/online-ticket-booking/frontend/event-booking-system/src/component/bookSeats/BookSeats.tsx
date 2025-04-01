import { useState } from "react";

const BookSeats = () => {
  const totalSeats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54];

  const [selectedSeats, setSelectedSeats] = useState<number[]>([2]);
  const [userSelectedSeats, setUserSelectedSeats] = useState<number[]>([]);

  // const handleSeatSelection=({index,seat}:any)=>{
  //   if(selectedSeats.includes(seat))
  //   {
  //     return
  //   }else{
  //     setUserSelectedSeats([...userSelectedSeats,seat])
  //   }
  //    console.log('Seats',seat)
  // }


  const handleSeatSelection = (seat: number) => {
    if (selectedSeats.includes(seat)) return; 

    setUserSelectedSeats((prevSeats) =>
      prevSeats.includes(seat)
        ? prevSeats.filter((s) => s !== seat) 
        : [...prevSeats, seat] 
    );
  };
  const bookedSeats=12
  
  console.log("hgjghj",userSelectedSeats)
  return (
    <div className="w-[1000px]  bg-white p-10 ">
      <div className="">
       <p className="text-center">  
        Select Seats
      </p>
      </div>
      <div className="w-[100%]  grid grid-cols-10 gap-4  items-center justify-center mt-2">
        {totalSeats.map((seat, index) => (
          <div key={index} className={`${selectedSeats.includes(seat)?"bg-red-600":userSelectedSeats.includes(seat) ? "bg-gray-500": "bg-green-500"}  h-12 w-12 flex items-center justify-center text-white font-bold rounded-md shadow-md`} onClick={()=>handleSeatSelection(seat)}>
            {seat}
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-4">
      Selected Seats:{" "} {userSelectedSeats.length > 0 ? (
          userSelectedSeats.map((seat) => <p key={seat}>{seat}</p>)
        ) : (
          <p>None</p>
        )}
      </div>
      <div className="mt-3 flex items-center justify-center">
          <button className="bg-black text-white p-4 w-[30%] cursor-pointer mt-4 book-tickets-btn">Submit</button>
      </div>
    </div>
  );
};

export default BookSeats;
