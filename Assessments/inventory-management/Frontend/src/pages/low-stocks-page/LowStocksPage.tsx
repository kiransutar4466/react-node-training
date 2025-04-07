import { lazy, Suspense, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllLowStocks } from "./lowStocksSaga"
import { rootState } from "../../store/store"
import Table from "../../components/Table"
import { VENDOR } from "../../constants/roles"
import TableControllers from "../../components/TableControllers"
import { MdEdit } from "react-icons/md"
import StatusComponent from "../../components/StatusComponent"
import { fetchAllCategories } from "../product-list-page/productSaga"
import Modal from "../../components/Modal"
import SmallLoader from "../../components/SmallLoader"
import { deselectProduct } from "../product-list-page/productSlice"
import { useNavigate } from "react-router"
const UpdateStockForm = lazy(()=>import('../../components/UpdateStockForm'))


const LowStocksPage = () => {

  const dispatch = useDispatch()
  const [pageNum, setPageNum] = useState(1)
  const [data, setData] = useState<any>([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedId, setSelectedId] = useState("")

  const {lowStocks, isLoading, details} = useSelector((state:rootState)=>state.lowStocks)
  const {userDetails} = useSelector((state:rootState)=>state.auth)
  const {allCategories} = useSelector((state:rootState)=>state.product)
  const navigate = useNavigate()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const columns = [
    { name: "Sr no.", width: "70px" },
    { name: "Product Name", width: "200px" },
    { name: "Price", width: "100px" },
    { name: "Vendor", width: "200px" },
    { name: "Stock Status", width: "150px" },
    { name: "Categories", width: "200px" },
  ];

  useEffect(()=>{
    dispatch(fetchAllLowStocks({
      page:pageNum,
      perPage:10,
      category:selectedCategory,
    }))
  },[pageNum, selectedCategory])

  console.log(lowStocks)

  useEffect(() => {
    setData(tableData);
  }, [lowStocks]);


  useEffect(() => {
    dispatch((fetchAllCategories(1)));
  }, []);


  console.log(isModalVisible)

  const tableData = lowStocks?.map((product) => {
    return {
      id: product.id,
      name: product.name,
      price: "$ " + product.price,
      inventoryName: product.inventoryName,
      stockStatus: (
        <StatusComponent
          bgColor={`${
            product.stockStatus == "IN_STOCK"
              ? "#c0fcbd"
              : product.stockStatus == "LOW_STOCK"
              ? "#fdff93"
              : "#fcd6d6"
          }`}
          color={`${
            product.stockStatus == "IN_STOCK"
              ? "#029300"
              : product.stockStatus == "LOW_STOCK"
              ? "#8a8e00"
              : "#d10606"
          }`}
          content={product.stockStatus
            .replace(/_/g, " ")
            .toLowerCase()
            .replace(/(?<=\b)\w/g, (match: string) => match.toUpperCase())}
        />
      ),
      categories: product.categories.join(", "),
    };
  });

  return (
    <div> <div className="w-full h-full max-h-full overflow-y-scroll px-5">
    <div className="my-3">
      <h1 className="font-bold text-[18px] text-start">Dead Stocks</h1>
      <p className="text-sm cursor-pointer"><span onClick={()=>navigate('/')}>Home</span>/<span onClick={()=>navigate('/low-stocks')}>Dead Stocks</span></p>
    </div> 

    
        <Modal
          isVisible={isModalVisible}
          toggleIsVisibleCb={()=>setIsModalVisible(false)}
          childComponent={
            <Suspense fallback={<SmallLoader />}>
              <UpdateStockForm id={selectedId} closeModalCb={()=>setIsModalVisible(false)}/>
            </Suspense>
          }
        />
      

    <div className="flex justify-end py-1  mt-12">
    <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              defaultValue={""}
              className="bg-primary-white text-text-dark py-1 px-2 rounded-[5px] border-[1px] border-table-border cursor-pointer"
            >
              {" "}
              <option value={""}>All Categories</option>
              {allCategories.map((category, key) => (
                <option key={key} value={category}>
                  {category}
                </option>
              ))}
            </select>
    </div>
    
    {lowStocks && data && (
          <Table
           // onClickRowCb={handleRowClick}
            isLoading={isLoading}
            tableData={data}
            columns={columns}
            isActions={
              userDetails?.role == VENDOR
                ? true
                : false
            }
            actions={[
              {
                content: <MdEdit />,
                onClickCb: (id: string) => {
                  dispatch(deselectProduct())
                  setSelectedId(id);
                  setIsModalVisible(true)
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
    
    </div></div>
  )
}

export default LowStocksPage