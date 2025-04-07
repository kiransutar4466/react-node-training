import axios from "axios";

export const getStatistics = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_BASE_URL}products/stats`,
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
