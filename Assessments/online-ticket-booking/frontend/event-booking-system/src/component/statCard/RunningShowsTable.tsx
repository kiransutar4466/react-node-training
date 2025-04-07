import { IoFilter } from "react-icons/io5";


const RunningShowsTable = ({ shows ,setIsFilterOpenCB}: any) => {
  console.log("dashboardData", shows);

  return (
    <div className=" rounded-[12px] bg-gradient-to-r from-[#ebe9e9] to-[#e5e4e4] text-black p-4">
      <div>
      
      </div>
      <h2 className="text-xl font-semibold mb-4 flex gap-4 items-center"> Events<p className="border-[1px] p-2 rounded-lg cursor-pointer" onClick={setIsFilterOpenCB}> <IoFilter /></p></h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-300 text-[14px] text-black text-left">
              <th className="p-2">Event Name</th>
              <th className="p-2 ms-4">Start Time</th>
              <th className="p-2">Category</th>
            </tr>
          </thead>
        </table>

        {/* Scrollable body */}
        <div className="max-h-[280px] overflow-y-auto custom-scrollbar">
          <table className="w-[90%] border-collapse">
            <tbody>
              {shows.length > 0 ? (
                shows.map((show: any, index: number) => (
                  <tr
                    key={index}
                    className="border-b border-gray-400 hover:bg-gray-200 transition duration-200 text-sm"
                  >
                    <td className="p-2 font-medium">
                      {show?.name?.substring(0, 20)}
                    </td>
                    <td className="p-2">
                      {/* {moment(show.startTime).subtract(10, "days").calendar()} */}
                      {show?.time}
                    </td>
                    <td className="p-2 line-clamp-2">
                      {show?.category?.substring(0, 60)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-gray-500">
                    No Running Events
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RunningShowsTable;
