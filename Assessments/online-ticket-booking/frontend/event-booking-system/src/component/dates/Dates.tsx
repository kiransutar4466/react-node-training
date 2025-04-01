import moment from "moment";

const Dates = ({date, handleGetSeletedDateCB}:any) => {
 
  return (

   
      <div className="flex gap-2 p-1" onClick={() => handleGetSeletedDateCB("")}>
    
          <div

            className="cursor-pointer h-20 w-16 flex flex-col items-center justify-center rounded-xl border-2 border-gray-500 bg-gray-800 text-white"
          >
            <span className="text-sm">{moment(date?.showDate).format('dddd')}</span>
            <span className="text-[16px] font-bold"   >{moment(date?.showDate).format(' Do ')}</span>
          </div>
  
      </div>

  );
};

export default Dates;