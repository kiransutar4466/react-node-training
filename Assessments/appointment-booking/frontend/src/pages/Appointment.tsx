import { Button } from "@/components/button";
import { Search } from "@/components/search";
import { Table } from "@/components/table";
import data from "../services/data.json";

const Appointment = () => {
  const { rows, columns } = data;
  return (
    <div className=" w-[1320px] mx-auto ">
      <div className=" flex justify-between mt-10 mb-6 ">
        <div className="w-[200px]">
          <Button variant="primary">Add Patient</Button>
        </div>

        <Search />
      </div>
      <Table rows={rows} columns={columns} />
    </div>
  );
};

export default Appointment;
