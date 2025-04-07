import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllInventoryOrders,
  fetchAllOrders,
  fetchOrderById,
  patchInventoryOrder,
  patchOrder,
} from "../pages/orders-page/ordersSaga";
import { rootState } from "../store/store";
import StatusComponent from "./StatusComponent";
import Button from "./Button";
import { VENDOR } from "../constants/roles";

const OrderDetails = ({ id, isSeller }: { id: string; isSeller: boolean }) => {
  const dispatch = useDispatch();
  const { selectedOrder } = useSelector((state: rootState) => state.orders);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState<string>("");
  const [selectedPaymentStatus, setSelectedPaymenStatus] = useState<string>("");
  const { userDetails } = useSelector((state: rootState) => state.auth);
  useEffect(() => {
    dispatch(fetchOrderById(id));
    if (selectedOrder?.orderStatus && selectedOrder?.paymentStatus) {
      setSelectedOrderStatus(selectedOrder?.orderStatus?.toString());
      setSelectedPaymenStatus(selectedOrder?.paymentStatus?.toString());
    }
  }, []);

  useEffect(() => {
    if (selectedOrder?.orderStatus && selectedOrder?.paymentStatus) {
      setSelectedOrderStatus(selectedOrder?.orderStatus?.toString());
      setSelectedPaymenStatus(selectedOrder?.paymentStatus?.toString());
    }
  }, [selectedOrder]);

  console.log(selectedOrder);

  console.log(isSeller);
  return (
    <>
      {selectedOrder && (
        <div className="bg-primary-white rounded-xl w-[600px] p-5">
          <div className="flex flex-col justify-between gap-3">
            <h2>
              <span className="font-medium">Product Name: </span>{" "}
              {selectedOrder?.productName}
            </h2>
            <p>
              <span className="font-medium">OrderId: </span> {selectedOrder?.id}
            </p>
            <p>
              <span className="font-medium">Total Price: </span> $
              {selectedOrder?.totalPrice}
            </p>

            <p>
              <span className="font-medium">Quantity: </span>{" "}
              {selectedOrder?.quantity}
            </p>

            <p className="flex gap-2 items-center">
              <span className="font-medium">Order Status: </span>{" "}
              {selectedOrder?.orderStatus && (
                <StatusComponent
                  bgColor={`${
                    selectedOrder?.orderStatus == "CONFIRMED" ||
                    selectedOrder?.orderStatus == "DELIVERED"
                      ? "#c0fcbd"
                      : selectedOrder?.orderStatus == "PENDING"
                      ? "#fdff93"
                      : "#fcd6d6"
                  }`}
                  color={`${
                    selectedOrder?.orderStatus == "CONFIRMED" ||
                    selectedOrder?.orderStatus == "DELIVERED"
                      ? "#029300"
                      : selectedOrder?.orderStatus == "PENDING"
                      ? "#8a8e00"
                      : "#d10606"
                  }`}
                  content={selectedOrder?.orderStatus
                    .toString()
                    .replace(/_/g, " ")
                    .toLowerCase()
                    .replace(/(?<=\b)\w/g, (match: string) =>
                      match.toUpperCase()
                    )}
                />
              )}
            </p>

            <p className="flex gap-2 items-center">
              <span className="font-medium">Payment Status: </span>{" "}
              {selectedOrder?.paymentStatus && (
                <StatusComponent
                  bgColor={`${
                    selectedOrder?.paymentStatus == "PAID"
                      ? "#c0fcbd"
                      : selectedOrder?.paymentStatus == "PENDING"
                      ? "#fdff93"
                      : "#fcd6d6"
                  }`}
                  color={`${
                    selectedOrder?.paymentStatus == "PAID"
                      ? "#029300"
                      : selectedOrder?.paymentStatus == "PENDING"
                      ? "#8a8e00"
                      : "#d10606"
                  }`}
                  content={selectedOrder?.paymentStatus
                    .toString()
                    .replace(/_/g, " ")
                    .toLowerCase()
                    .replace(/(?<=\b)\w/g, (match: string) =>
                      match.toUpperCase()
                    )}
                />
              )}
            </p>
          </div>

          {!isSeller && selectedOrder?.orderStatus == "PENDING" && (
            <div className="flex justify-end w-full">
              <Button
                onClickCb={() => {
                  console.log("called");
                  dispatch(
                    patchOrder({
                      id,
                      formData: { orderStatus: "CANCELLED" },
                      dispatchAction: () => {
                        dispatch(fetchOrderById(id));
                        dispatch(
                          fetchAllOrders({ page: 1, perPage: 10, search: "" })
                        );
                      },
                    })
                  );
                }}
                btnContent="Cancel Order"
                width="fit"
                bgColor="primary-orange"
                color="primary-white"
              />
            </div>
          )}

          {isSeller &&
            userDetails?.role == VENDOR &&
            selectedOrderStatus &&
            selectedPaymentStatus && (
              <div>
                <div className="flex  w-full gap-3 mt-8 font-medium mb-6">
                  <div className="w-fit">
                    <label>Update Order Status: </label>{" "}
                    <select
                      defaultValue={selectedOrderStatus}
                      onChange={(e) => setSelectedOrderStatus(e.target.value)}
                      className="px-2 py-1 rounded-lg bg-secondary-white border-1 font-normal text-xs"
                    >
                      <option value={"PENDING"}>Pending</option>
                      <option value={"CONFIRMED"}>Confirmed</option>
                      <option value={"DELIVERED"}>Delivered</option>
                      <option value={"REJECTED"}>Rejected</option>
                    </select>
                  </div>

                  <div className="w-fit ">
                    <label>Update Payment Status: </label>{" "}
                    <select
                      defaultValue={selectedPaymentStatus}
                      onChange={(e) => setSelectedPaymenStatus(e.target.value)}
                      className="px-2 py-1 rounded-lg bg-secondary-white border-1 font-normal text-xs"
                    >
                      <option value={"PAID"}>Paid</option>
                      <option value={"PENDING"}>Pending</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    onClickCb={() => {
                      (selectedOrderStatus !== selectedOrder.orderStatus ||
                        selectedPaymentStatus !==
                          selectedOrder.paymentStatus) &&
                        dispatch(
                          patchInventoryOrder({
                            id,
                            formData: {
                              orderStatus: selectedOrderStatus,
                              paymentStatus: selectedPaymentStatus,
                            },
                            dispatchAction: () => {
                              dispatch(fetchOrderById(id));
                              dispatch(
                                fetchAllInventoryOrders({
                                  page: 1,
                                  perPage: 10,
                                  search: "",
                                })
                              );
                            },
                          })
                        );
                    }}
                    btnContent="Submit"
                    width="fit"
                    bgColor="dark-orange"
                    color="primary-white"
                  />
                </div>
              </div>
            )}
        </div>
      )}
    </>
  );
};

export default OrderDetails;
