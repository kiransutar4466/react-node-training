export type createVendorPayloadType = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  contactNumber: number | string;
  city: string;
  pinCode: number | string;
  inventoryName: string;
};

export type vendorStateType = {
  isLoading: boolean;
  error: string | null;
  vendors: createVendorPayloadType[] | null;
  details: detailsType | null;
  selectedVendor: createVendorPayloadType | null;
  isSuccess: boolean;
};

export type detailsType = {
  page: number;
  next: number | null;
  prev: number | null;
  totalPages: number;
};

export type fetchVendorsPayloadType = {
  page: number;
  perPage: number;
  searchQuery: string;
};

export type tableDataType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  contactNumber: string;
};
