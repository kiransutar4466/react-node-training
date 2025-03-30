import { useEffect, useState } from "react";
import data from "../services/doctor_data.json";
import { Button } from "@/components/button";
import { Table } from "@/components/table";
import { ProviderForm } from "@/components/providerForm";
import { Modal } from "@/components/modal/Modal";
import { FaEdit, FaPlusCircle, FaRegEye } from "react-icons/fa";
import {
  deleteProvider,
  getAllProvider,
  getProviderById,
  updateProvider,
} from "@/services/provider";
import { RiDeleteBin6Fill } from "react-icons/ri";

const Doctor = () => {
  const [isAddModal, setIsAddModal] = useState(false);
  const [rows, setRows] = useState([]);
  const [dataChange, setDataChange] = useState(false);
  const [formData, setFormData] = useState({});

  const columns = [
    "specialization",
    "firstName",
    "lastName",
    "email",
    "degree",
    "contactNo",
  ];

  const actionsData = {
    uniqueIdKey: "id",
    actions: [
      { name: "edit", icon: <FaEdit /> },
      { name: "delete", icon: <RiDeleteBin6Fill /> },
      { name: "view", icon: <FaRegEye /> },
    ],
  };

  const actionHandler = async (actionName, id) => {
    if (actionName === "delete") {
      const res = await deleteProvider(id);
      if (res.data) {
        setDataChange(!dataChange);
      }
    } else if (actionName === "edit") {
      const res = await getProviderById(id);
      if (res.data) {
        setIsAddModal(true);
        setFormData(res.data.result);
      }
      console.log(res.data);
    } else {
      console.log(actionName, id, "view?");
    }
  };

  const handleClose = () => {
    setFormData({});
    setIsAddModal(false);
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await getAllProvider();
      setRows(res.data.result);
    };
    fetch();
  }, [dataChange]);

  return (
    <div className=" w-[1320px] mx-auto ">
      <div className=" flex  justify-between mt-10 mb-6 ">
        <div></div>
        <div>
          <Modal isOpen={isAddModal} handleClose={handleClose}>
            <ProviderForm formData={formData} handleClose={handleClose} />
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
                <div>Add Provider</div>
                <div className="min-w-0">
                  <FaPlusCircle size={24} />
                </div>
              </div>
            </Button>
          </div>
          {/* <Search /> */}
        </div>
      </div>
      <Table
        rows={rows}
        columns={columns}
        actionData={actionsData}
        actionHandler={actionHandler}
      />
    </div>
  );
};

export default Doctor;
