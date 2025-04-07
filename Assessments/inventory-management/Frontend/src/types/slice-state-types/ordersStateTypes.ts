import { ReactNode } from "react";
import { detailsType } from "./vendorStateTypes";

export type ordersStateTypes = {
  isLoading: boolean;
  error: string | null;
  orders: orderType[] | null;
  details: detailsType | null;
  selectedOrder: orderType | null;
  isSuccess: boolean;
};

export type orderType = {
  id?: string;
  productId?: string;
  productName?: string;
  quantity?: number;
  orderedBy: string;
  address: string;
  totalPrice?: number | string;
  orderStatus: string | ReactNode;
  paymentStatus: string | ReactNode;
};
