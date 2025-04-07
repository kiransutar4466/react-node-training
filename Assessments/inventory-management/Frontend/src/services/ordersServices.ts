import axios from "axios";

export const getAllOrdersService = async (payload: {
  page: number;
  perPage: number;
  search: string;
}) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_BASE_URL}orders?page=${payload.page}&perPage=${payload.perPage}&search=${payload.search}`,
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

export const getOrderByIdService = async (payload: string) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_BASE_URL}orders/${payload}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      },
    );
    console.log("serive success", response);

    return response;
  } catch (error: any) {
    console.log("serive fails", error);
    return error.response.data.message[0];
  }
};

export const getAllInventoryOrdersService = async (payload: {
  page: number;
  perPage: number;
  search: string;
}) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_BASE_URL}inventory/orders?page=${payload.page}&perPage=${payload.perPage}&search=${payload.search}`,
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

export const postOrderService = async () => {
  const token = localStorage.getItem("token");

  console.log(token, "token");

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_BASE_URL}orders`,
      {},
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

export const patchOrderService = async (payload: {
  id: string;
  formData: any;
}) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_SERVER_BASE_URL}orders/${payload.id}`,
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

export const patchInventoryOrderService = async (payload: {
  id: string;
  formData: any;
}) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_SERVER_BASE_URL}inventory/orders/${payload.id}`,
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
