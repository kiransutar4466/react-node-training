import { Button } from "@/components/button";
import { Search } from "@/components/search";
import { Table } from "@/components/table";
import { Modal } from "@/components/modal/Modal";
import { PatientForm } from "@/components/patientForm";
import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import {
  deletePatient,
  getAllPatients,
  getPatientDetailsWithId,
} from "@/services/provider";
import { CgEditBlackPoint } from "react-icons/cg";
import { FaEdit, FaRegEye } from "react-icons/fa";

import { RiDeleteBin6Fill } from "react-icons/ri";

const Patient = () => {
  const [isAddModal, setIsAddModal] = useState(false);
  const [rows, setRows] = useState([]);
  const [dataChange, setDataChange] = useState(false);
  const [formData, setFormData] = useState({});

  const columns = [
    "firstName",
    "lastName",
    "email",
    "gender",
    "contactNo",
    "remark",
  ];

  const actionsData = {
    uniqueIdKey: "id",
    actions: [
      { name: "edit", icon: <FaEdit /> },
      { name: "delete", icon: <RiDeleteBin6Fill /> },
      { name: "view", icon: <FaRegEye /> },
    ],
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await getAllPatients();
      console.log(res.data.result);
      setRows(res.data.result);
    };
    fetch();
  }, [dataChange]);

  const handleClose = () => {
    setFormData({});
    setIsAddModal(false);
  };

  const ActionHandler = async (actionName, uniqueIdentifier) => {
    if (actionName == "delete") {
      const res = await deletePatient(uniqueIdentifier);
      if (res.data) {
        setDataChange(!dataChange);
      }
    } else if (actionName == "edit") {
      const res = await getPatientDetailsWithId(uniqueIdentifier);
      if (res.data) {
        setIsAddModal(true);
        setFormData(res.data.result[0]);
      }
      console.log(res.data);
    }
    console.log(actionName, uniqueIdentifier);
  };
  return (
    <div className=" w-[1320px] mx-auto ">
      <div className=" flex justify-between mt-10 mb-6 ">
        <div></div>
        <div>
          <Modal isOpen={isAddModal} handleClose={handleClose}>
            <PatientForm formData={formData} handleClose={handleClose} />
          </Modal>

          <div className=" w-[200px] mr-12 ">
            <Button
              variant="primary"
              onClick={() => {
                console.log("hi");
                setIsAddModal(true);
                console.log("hlo");
              }}
            >
              <div className="flex gap-4 justify-center items-center font-bold">
                <div>Add Patient</div>
                <div className="min-w-0">
                  <FaPlusCircle size={24} />
                </div>
              </div>
            </Button>
          </div>

          {/* <Search /> */}
        </div>
        {/* <div className="w-[200px]">
          <Button variant="primary">Add Patient</Button>
        </div> */}
      </div>
      <Table
        rows={rows}
        columns={columns}
        actionData={actionsData}
        actionHandler={ActionHandler}
      />
    </div>
  );
};

export default Patient;
