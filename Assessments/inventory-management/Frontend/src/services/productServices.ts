import axios from "axios";
import {
  fetchProductsPayoadType,
  ProductFormInputType,
} from "../types/slice-state-types/productStateTypes";

export const getAllProductsService = async (
  payload: fetchProductsPayoadType,
) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_BASE_URL}products?page=${payload.page}&perPage=${payload.perPage}&name=${payload.name}&category=${payload.category}&inventoryId=${payload.inventoryId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      },
    );

    return response;
  } catch (error: any) {
    return error.response.data.message[0];
  }
};

export const getAllCategoryService = async (payload: number) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_BASE_URL}categories?page=${payload}&perPage=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      },
    );

    return response;
  } catch (error: any) {
    return error.response.data.message[0];
  }
};

export const getProductByIdService = async (payload: string) => {
  const token = localStorage.getItem("token");

  console.log(payload);

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_BASE_URL}products/${payload}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      },
    );

    return response;
  } catch (error: any) {
    return error.response.data.message[0];
  }
};

export const postProductService = async (payload: ProductFormInputType) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_BASE_URL}products`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      },
    );

    return response;
  } catch (error: any) {
    return error.response.data.message[0];
  }
};

export const patchProductService = async (payload: {
  id: string;
  formData: ProductFormInputType;
}) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_SERVER_BASE_URL}products/${payload.id}`,
      payload.formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      },
    );

    return response;
  } catch (error: any) {
    return error.response.data.message[0];
  }
};

export const deleteProductByIdService = async (payload: string) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_SERVER_BASE_URL}products/${payload}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      },
    );

    return response;
  } catch (error: any) {
    return error.response.data.message[0];
  }
};
