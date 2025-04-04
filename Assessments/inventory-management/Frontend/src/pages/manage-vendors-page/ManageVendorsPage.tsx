import { SetStateAction, Suspense, useEffect, useState } from "react";
import VendorForm from "../../components/VendorForm";
import Modal from "../../components/Modal";
import Table from "../../components/Table";
import TableControllers from "../../components/TableControllers";
import { rootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteVendor, fetchAllVendors, fetchVendorById } from "./vendorSaga";
import { MdDelete, MdEdit } from "react-icons/md";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";
import { deselectVendor } from "./vendorSlice";
import ConfirmForm from "../../components/ConfirmForm";
import SmallLoader from "../../components/SmallLoader";
import VendorDetails from "../../components/VendorDetails";
import useDebounce from "../../hooks/useDebounce";

const ManageVendorsPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalReason, setModalReason] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<any>();
  const [pageNum, setPageNum] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedId, setSelectedId] = useState("");



  const dispatch = useDispatch();
  const { vendors, isLoading, details, selectedVendor } = useSelector(
    (state: rootState) => state.vendor
  );

  const debounceValue = useDebounce({value:searchQuery, delay:1000})

  const tableData = vendors?.map((vendor) => {
    return {
      id: vendor?.id,
      name: vendor?.firstName+" "+vendor?.lastName,
      email: vendor?.email,
      companyName: vendor?.companyName,
      contactNumber: vendor?.contactNumber,
    };
  });

  const columns = [
    { name: "Sr no.", width: "60px" },
    { name: "Name", width: "200px" },
    { name: "Email", width: "220px" },
    { name: "Company Name", width: "250px" },
    { name: "Contact Number", width: "150px" },
  ];

  const handleDeleteModal = (id: string) => {
    dispatch(deselectVendor());
    setModalReason("deleteVendor");
    setSelectedId(id);
    setIsModalVisible(true);
  };

  const handleRowClick = (id: string) => {
    if(selectedId !== id){
      dispatch(deselectVendor());
      setSelectedId(id);
    }
      setModalReason("viewVendorDetails");
      setIsModalVisible(true);
    };

  useEffect(()=>{
    if(selectedId.length>0){
      dispatch(fetchVendorById(selectedId))
    }
  },[selectedId])

  useEffect(() => {
    if (vendors && tableData) {
      setData(tableData);
    }
  }, [vendors]);

  useEffect(() => {
    if (confirmDelete) {
      dispatch(deleteVendor({id:selectedId , dispatchAction:()=>dispatch(
        fetchAllVendors({
          page: pageNum,
          searchQuery:debounceValue,
          perPage: 10,
        })
      )}));
    }
    return () => {
      setConfirmDelete(false);
      setModalReason("");
      setSelectedId("");
    };
  }, [confirmDelete]);

  useEffect(() => {
   
      dispatch(
        fetchAllVendors({
          page: pageNum,
          searchQuery:debounceValue,
          perPage: 10,
        })
      );
  
  }, [debounceValue, pageNum, dispatch]);

  const [selectedData, setSelectedData] = useState<any>(selectedVendor);

  useEffect(() => {
    setSelectedData(selectedVendor);
  }, [selectedVendor?.id]);


  return (
    <div>
      {modalReason == "addVendor" && (
        <Modal
          toggleIsVisibleCb={() => setIsModalVisible(false)}
          isVisible={isModalVisible}
          childComponent={<VendorForm title="Add Vendor" />}
        />
      )}

      {modalReason == "editVendor" && selectedVendor && (
        <Modal
          toggleIsVisibleCb={() => setIsModalVisible(false)}
          isVisible={isModalVisible}
          childComponent={
            <VendorForm
              title="Edit Vendor"
              id={selectedVendor.id}
              initialData={{
                firstName: selectedVendor.firstName,
                lastName: selectedVendor.lastName,
                email: selectedVendor.email,
                companyName: selectedVendor.companyName,
                contactNumber: selectedVendor.contactNumber,
                city: selectedVendor.city,
                pinCode: selectedVendor.pinCode,
                inventoryName: selectedVendor.inventoryName,
              }}
            />
          }
        />
      )}

      {modalReason == "deleteVendor" && (
        <Modal
          isVisible={isModalVisible}
          toggleIsVisibleCb={() => setIsModalVisible(false)}
          childComponent={
            <ConfirmForm
              message="Are you sure, you want to remove this vendor?"
              buttonContent={"Remove"}
              cancelCb={() => setIsModalVisible(false)}
              actionCb={() => setConfirmDelete(true)}
            />
          }
        />
      )}

    {modalReason == "viewVendorDetails" && selectedData && (
        <Modal
          isVisible={isModalVisible}
          toggleIsVisibleCb={() => setIsModalVisible(false)}
          childComponent={
            <Suspense fallback={<SmallLoader />}>
              <VendorDetails vendorDetails={selectedData} />
            </Suspense>
          }
        />
      )}

      <div className="w-full h-full max-h-full overflow-y-scroll">
        <div className="my-3">
          <h1 className="font-bold text-2xl text-center">Vendor List</h1>
        </div>
        <div className="mb-1 flex justify-between">
          
            <SearchBar
              onChangeCb={(e: { target: { value: SetStateAction<string> } }) =>
                setSearchQuery(e.target.value)
              }
              id={"searchQuery"}
              name={"searchQuery"}
              placeholder={"Enter search query"}
              value={searchQuery}
              width="400px"
            />

            <Button
              btnContent={"Add Vendor"}
              onClickCb={() => {
                setModalReason("addVendor");
                setIsModalVisible(true);
              }}
              color="primary-white"
              bgColor="primary-orange"
              width="fit"
            />
       
        </div>

        {data && (
          <Table
            onClickRowCb={handleRowClick}
            isLoading={isLoading}
            tableData={data}
            columns={columns}
            isActions={true}
            actions={[
              {
                content: <MdEdit />,
                onClickCb: (id: string) => {
                  dispatch(deselectVendor());
                  dispatch(fetchVendorById(id));
                  setModalReason("editVendor");
                  setIsModalVisible(true);
                },
              },
              {
                content: <MdDelete />,
                onClickCb: (id: string) => {
                  handleDeleteModal(id);
                },
              },
            ]}
            pageNum={pageNum}
            perPage={10}
          />
        )}
        {details && (
          <TableControllers
            nextPageCb={() => {
              setPageNum((prev) => prev + 1);
            }}
            prevPageCb={() => {
              setPageNum((prev) => prev - 1);
            }}
            pageNum={details?.page}
            totolPages={details?.totalPages}
          />
        )}
      </div>
    </div>
  );
};

export default ManageVendorsPage;
