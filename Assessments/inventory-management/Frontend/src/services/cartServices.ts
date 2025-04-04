import axios from "axios";

export const getCartService = async (payload: {
  page: number;
  perPage: number;
}) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_BASE_URL}cartItems?page=${
        payload.page
      }&perPage=${payload.perPage}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    return error.response.data.message[0];
  }
};

export const postCartItemService = async (payload: {
  productId: string;
  quantity: number;
}) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_BASE_URL}cartItems`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );

    return response;
  } catch (error: any) {
    return error.response.data.message[0];
  }
};


export const patchCartService = async (payload: {
  itemId: string;
  data: {quantity:number};
}) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_SERVER_BASE_URL}cartItems/${payload.itemId}`,
      payload.data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );
    return response;
  } catch (error: any) {
    console.log(error)
    return error.response.data.message[0];
  }
};


export const deleteCartItemService = async (payload: string) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_SERVER_BASE_URL}cartItems/${payload}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );

    return response;
  } catch (error: any) {
    return error.response.data.message[0];
  }
};


export const emptyCartService = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_SERVER_BASE_URL}cartItems`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );

    return response;
  } catch (error: any) {
    return error.response.data.message[0];
  }
};
