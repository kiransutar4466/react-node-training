import { SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllInventoryOrders, fetchAllOrders } from "./ordersSaga";
import { rootState } from "../../store/store";
import SearchBar from "../../components/SearchBar";
import Table from "../../components/Table";
import TableControllers from "../../components/TableControllers";
import { orderType } from "../../types/slice-state-types/ordersStateTypes";
import StatusComponent from "../../components/StatusComponent";
import Modal from "../../components/Modal";
import OrderDetails from "../../components/OrderDetails";
import { VENDOR } from "../../constants/roles";
import useDebounce from "../../hooks/useDebounce";
import { deselectOrder } from "./ordersSlice";
import { useNavigate } from "react-router";

const OrdersPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [data, setData] = useState<orderType[] | undefined | any>([]);
  const dispatch = useDispatch();
  const [isInventoryOrders, setIsInventoryOrders] = useState(true);
  const [selectedId, setSelectedId] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { orders, isLoading, details } = useSelector(
    (state: rootState) => state.orders,
  );
  const { userDetails } = useSelector((state: rootState) => state.auth);

  const columns = [
    { name: "Sr no.", width: "100px" },
    { name: "Product Name", width: "250px" },
    { name: "Quantity", width: "100px" },
    { name: "Price", width: "100px" },
    { name: "Order Status", width: "150px" },
    { name: "Payment Status", width: "150px" },
  ];

  const handleRowClick = (id: string) => {
    dispatch(deselectOrder());
    setSelectedId(id);
    setIsModalVisible(true);
  };

  const navigate = useNavigate();

  const debounceValue = useDebounce({ value: searchQuery, delay: 1000 });

  useEffect(() => {
    setPageNum(1);
  }, [isInventoryOrders]);
  useEffect(() => {
    setData(
      orders?.map((order) => {
        return {
          id: order.id,
          productName: order.productName,
          quantity: order.quantity,
          totalPrice: "$ " + order.totalPrice,
          orderStatus: order.orderStatus && (
            <StatusComponent
              bgColor={`${
                order.orderStatus == "CONFIRMED" ||
                order.orderStatus == "DELIVERED"
                  ? "#c0fcbd"
                  : order.orderStatus == "PENDING"
                    ? "#fdff93"
                    : "#fcd6d6"
              }`}
              color={`${
                order.orderStatus == "CONFIRMED" ||
                order.orderStatus == "DELIVERED"
                  ? "#029300"
                  : order.orderStatus == "PENDING"
                    ? "#8a8e00"
                    : "#d10606"
              }`}
              content={order.orderStatus
                .toString()
                .replace(/_/g, " ")
                .toLowerCase()
                .replace(/(?<=\b)\w/g, (match: string) => match.toUpperCase())}
            />
          ),
          paymentStatus: order.paymentStatus && (
            <StatusComponent
              bgColor={`${
                order.paymentStatus == "PAID"
                  ? "#c0fcbd"
                  : order.paymentStatus == "PENDING"
                    ? "#fdff93"
                    : "#fcd6d6"
              }`}
              color={`${
                order.paymentStatus == "PAID"
                  ? "#029300"
                  : order.paymentStatus == "PENDING"
                    ? "#8a8e00"
                    : "#d10606"
              }`}
              content={order.paymentStatus
                .toString()
                .replace(/_/g, " ")
                .toLowerCase()
                .replace(/(?<=\b)\w/g, (match: string) => match.toUpperCase())}
            />
          ),
        };
      }),
    );
  }, [orders]);

  useEffect(() => {
    if (isInventoryOrders) {
      dispatch(
        fetchAllInventoryOrders({
          page: pageNum,
          perPage: 10,
          search: debounceValue,
        }),
      );
    } else {
      dispatch(
        fetchAllOrders({
          page: pageNum,
          perPage: 10,
          search: debounceValue,
        }),
      );
    }
  }, [debounceValue, pageNum, isInventoryOrders]);

  return (
    <>
      <Modal
        isVisible={isModalVisible}
        toggleIsVisibleCb={() => setIsModalVisible(false)}
        childComponent={
          <OrderDetails id={selectedId} isSeller={isInventoryOrders} />
        }
      />

      <div className="w-full h-full max-h-full px-5">
        <div className="my-3">
          <h1 className="font-bold text-[18px] text-start">Orders</h1>
          <p className="text-sm cursor-pointer">
            <span onClick={() => navigate("/")}>Home</span>/
            <span onClick={() => navigate("/orders")}>Orders</span>
          </p>
        </div>

        <div className="flex justify-between py-1 h-10  mt-12">
          <SearchBar
            onChangeCb={(e: { target: { value: SetStateAction<string> } }) =>
              setSearchQuery(e.target.value)
            }
            id={"searchQuery"}
            name={"searchQuery"}
            placeholder={"Search orders"}
            value={searchQuery}
            width="300px"
          />

          {userDetails?.role == VENDOR && (
            <div className="flex justify-between gap-1 items-center px-1  py-2  bg-primary-white border-[1px]  mx-2 text-xs rounded-[5px]">
              <span
                onClick={() => setIsInventoryOrders(false)}
                className={`w-[130px] h-fit cursor-pointer p-1 text-center rounded-[5px] ${isInventoryOrders ? "text-secondary-gray " : "text-primary-white drop-shadow-md bg-dark-orange border-none"}`}
              >
                My Orders
              </span>
              <span
                onClick={() => setIsInventoryOrders(true)}
                className={`w-[130px]  h-fit cursor-pointer p-1 text-center  rounded-[5px] ${isInventoryOrders ? "text-primary-white drop-shadow-md bg-dark-orange border-none" : "text-secondary-gray"}`}
              >
                Inventory Orders
              </span>
            </div>
          )}
        </div>

        {orders && data && (
          <Table
            onClickRowCb={handleRowClick}
            isLoading={isLoading}
            tableData={data}
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
  );
};

export default OrdersPage;
