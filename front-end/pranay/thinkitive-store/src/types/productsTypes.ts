export type productsStateType = {
  products: productType[];
  filteredProducts: productType[];
  isLoading: boolean;
  error?: string | null;
};

export type productType = {
  id?: number;
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  image?: string;
  rating?: {
    rate: number;
    count: number;
  };
  count?: number;
};

export type currentProductStateType = {
  currentProduct: productType;
  isLoading: boolean;
  error: string | null;
};
