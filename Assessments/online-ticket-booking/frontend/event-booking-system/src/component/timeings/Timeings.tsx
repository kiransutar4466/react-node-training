import { LinearProgress } from "@mui/material";


const Timeings = ({ times, loading, handleShowSeatBookingModalCB }: any) => {

  return (
   <>
       
      {times &&
        times.map((time: any) => (
          <>
         
            <div className="p-4 w-40">
              {/* {loading ? <LinearProgress /> : ""} */}

              <div className="">
                <div
                  className="h-10 w-30 border-[1px] rounded-[4px] text-[14px] border-[gray] text-green-600 bg-white   flex justify-center items-center cursor-pointer"
                  onClick={()=>handleShowSeatBookingModalCB(time.id)}
                >
                  <p> {time?.showStartTime} </p>
                
                </div>
              </div>
            </div>
          </>
        ))}
        </>
 
  );
};

export default Timeings;
