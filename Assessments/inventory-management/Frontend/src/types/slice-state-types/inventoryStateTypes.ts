export type inventoryStateTypes = {
  isLoading: boolean;
  error: string | null;
  inventories: inventoryType[] | null;
  details: detailsType | null;
  selectedInventory: inventoryType | null;
  isSuccess: boolean;
};

export type detailsType = {
  page: number;
  next: number | null;
  prev: number | null;
  totalPages: number;
};

export type inventoryType = {
  id: string;
  name: string;
  city: string;
  pinCode: string;
  vendorName: string;
  totalStocks: number;
};
