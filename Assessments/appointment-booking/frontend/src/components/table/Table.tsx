import "./Table.css";
import { BsThreeDotsVertical } from "react-icons/bs";

export const Table = ({ rows, columns, actionData, actionHandler }) => {
  return (
    <div className=" table-compo bg-primary rounded-lg  overflow-x-visible max-w-[1580px] mx-auto overflow-y-auto max-h-[600px] ">
      <table className="w-full shadow-4xl shadow-black-200">
        <thead className=" sticky bg-primary inset-0 z-99  ">
          <tr>
            <th>#</th>

            {columns?.map((col, index) => (
              <th key={index.toString() + col}>{col}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="  bg-white text-gray-800 ">
          {/* <tr></tr> */}
          {rows?.map((row, index) => {
            return (
              <tr
                key={index}
                className=" shadow drop-shadow-lg mb-1 hover:bg-gray-100  "
              >
                <td>{index + 1}</td>

                {columns?.map((col, index) => (
                  <td key={index}>{row[col]}</td>
                ))}

                <td className="relative group text-center h-full">
                  <div className=" flex gap-4 w-full">
                    {actionData?.actions?.map(({ name, icon }) => {
                      return (
                        <button
                          key={name}
                          onClick={() =>
                            actionHandler(name, row[actionData.uniqueIdKey])
                          }
                        >
                          {icon}
                        </button>
                      );
                    })}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
