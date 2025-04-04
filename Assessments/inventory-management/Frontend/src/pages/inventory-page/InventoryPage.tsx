import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../store/store";
import Table from "../../components/Table";
import { SetStateAction, useEffect, useState } from "react";
import TableControllers from "../../components/TableControllers";
import { fetchAllInventories } from "./inventorySaga";
import SearchBar from "../../components/SearchBar";
import useDebounce from "../../hooks/useDebounce";


const InventoryPage = () => {

  const {inventories, isLoading, details} = useSelector((state:rootState)=>state.inventory)
  const [pageNum, setPageNum] = useState(1)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const dispatch = useDispatch()

  const columns = [{name:"Sr no.", width:"100px"}, {name:"Inventory Name", width:"200px"}, {name:"City", width:"100px"}, {name:"Pincode", width:"100px"}, {name:"Vendor", width:"150px"} ,{name:"Total Stocks", width:"100px"}]
  const debounceValue = useDebounce({value:searchQuery, delay:1000})
  
  useEffect(()=>{
    dispatch(fetchAllInventories({
      page:pageNum,
      perPage:10,
      search:debounceValue
    }))
  },[pageNum, debounceValue])




  return (
   <>
    <div className="w-full h-full max-h-full overflow-y-scroll">
        <div className="my-3">
          <h1 className="font-bold text-2xl text-center">Inventory List</h1>
        </div>

        <div className="flex justify-start py-1 h-10">
        <SearchBar
              onChangeCb={(e: { target: { value: SetStateAction<string>; }; }) =>
                setSearchQuery(e.target.value)
              }
              id={"searchQuery"}
              name={"searchQuery"}
              placeholder={"Search inventory"}
              value={searchQuery}
              width="400px"
            />
        </div>

        {inventories && (
          <Table
            //onClickRowCb={handleRowClick}
            isLoading={isLoading}
            tableData={inventories}
            columns={columns}
            isActions={false}
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
   
   </>
  )
}

export default InventoryPage