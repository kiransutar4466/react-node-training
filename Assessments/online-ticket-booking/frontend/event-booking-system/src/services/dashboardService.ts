import axios from 'axios';
import { BASE_URL } from './baseUrl';

export const fetchDashboardDataApi = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(`${BASE_URL}/dashboard`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420",
            },
        });
        return { response };

    } catch (error: any) {
        throw error.response?.data?.message || "Something went wrong";
    }
}
