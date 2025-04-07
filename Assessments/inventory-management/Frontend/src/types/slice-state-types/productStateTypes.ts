export type productStateTypes = {
  isLoading: boolean;
  error: string | null;
  products: productType[] | null;
  details: deatilsType | null;
  allCategories: [] | string[];
  selectedProduct: productType | null;
  isSuccess: boolean;
};

export type deatilsType = {
  page: number;
  next: number | null;
  prev: number | null;
  totalPages: number;
};

export type productType = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  stockStatus: string;
  inventoryId: string | null;
  inventoryName: string | null;
  categories: string[];
  soldCount?: number;
};

export type fetchProductsPayoadType = {
  page: number;
  perPage: number;
  name: string;
  category: string;
  inventoryId: string | undefined;
};

export type ProductFormInputType = {
  name?: string;
  description?: string;
  quantity: string | number;
  price?: string | number;
  categories?: string | string[];
};
