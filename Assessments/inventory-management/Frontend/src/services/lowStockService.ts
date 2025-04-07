import axios from "axios";

export const getAllLowStocksService = async (payload: {
  page: number;
  perPage: number;
  category: string;
}) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_BASE_URL}products/deadStocks?page=${
        payload.page
      }&perPage=${payload.perPage}&category=${payload.category}`,
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
