import moment from "moment";


const Dates = ({date, handleGetSeletedDateCB,selectedDate}:any) => {

   
  
  const day=moment(date).format('dddd')


  
 
  return (

   <div className="flex gap-2 dash-board-card">
      
    {date.map((date:any)=>(
      <div className="flex gap-2 p-1" onClick={() => handleGetSeletedDateCB(date)}>
      <div

        className={`cursor-pointer px-4 py-2  flex flex-col items-center justify-center rounded-[12px] border-2 ${selectedDate==date?"bg-gray-800":"bg-white"} border-gray-500  ${selectedDate==date?"text-white":"bg-black"} `}
      >
        <span className="text-sm">{day&&moment(date).format('dddd')}</span>
        <span className="text-[12px] "   >{moment(date).format('ll')}</span>
      </div>

  </div>
    ))}
    </div>
  

  );
};

export default Dates;