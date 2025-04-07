import { productType } from "./productStateTypes";

export type lowStocksTypes = {
  isLoading: boolean;
  error: string | null;
  lowStocks: productType[] | null;
  details: detailsTypes | null;
  isSuccess: boolean;
};

export type detailsTypes = {
  page: number;
  next: number | null;
  prev: number | null;
  totalPages: number;
};
