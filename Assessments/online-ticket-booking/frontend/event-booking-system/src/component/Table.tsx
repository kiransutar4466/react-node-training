import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import moment from 'moment';
import { LinearProgress } from "@mui/material";
const Table = ({
  loading,
  cols,
  rows,
  openModalCB,
  toggleShowDetails,
  deletDataCB,
}: any) => {
  return (
    <div className="w-full overflow-x-auto bg-gray-900 text-white rounded-xl shadow-lg p-4">
      <table className="w-full border-collapse">
        <thead className="bg-gray-800 text-gray-300 uppercase text-sm">
          <tr>
            {cols.map((item: any, index: number) => (
              <th
                key={index}
                className="px-4 py-3 text-left border-b border-gray-700"
              >
                {item}
              </th>
            ))}
            <th className="px-4 py-3 text-left border-b border-gray-700">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {rows&&rows.length > 0 ? (
            rows.map((row: any, rowIndex: number) => (
              <tr
                key={rowIndex}
                className="hover:bg-gray-800 transition duration-300 border-b border-gray-700"
              >
                <td className="px-4 py-3">{rowIndex + 1}</td>
                <td className="px-4 py-3">{row?.eventName}</td>
                <td className="px-4 py-3">
                  {row?.eventDescription.substring(0, 20)}..
                </td>
                <td className="px-4 py-3">{moment(row?.eventStartDate).subtract(10, 'days').calendar()}</td>
                <td className="px-4 py-3">{moment(row?.eventEndDate).subtract(10, 'days').calendar()}</td>
                <td className="px-4 py-3">₹{row?.eventPrice}</td>
                <td className="px-4 py-3">{row?.eventTotalSeats}</td>

              
                <td className="px-4 py-3">
                  <div className="text-xl flex gap-4">
                    <FaRegEye
                      className="cursor-pointer hover:text-gray-400 transition duration-200"
                      onClick={() => toggleShowDetails(row.id)}
                    />
                    <CiEdit
                      onClick={() => openModalCB(row.id)}
                      className="cursor-pointer hover:text-yellow-400 transition duration-200"
                    />
                    <MdDeleteOutline
                      className="cursor-pointer hover:text-red-500 transition duration-200"
                      onClick={() => deletDataCB(row.id)}
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
            
              <td
                colSpan={cols.length + 1}
                className="text-center py-6 text-gray-400"
              >
                 {/* {loading? <LinearProgress />:''} */}
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
