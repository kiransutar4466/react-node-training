import axios from "axios";

export const newsApiInstance = axios.create({
  baseURL: "https://newsapi.org/v2/",
});

const API_KEY = "c670a3c393264c08a33845209961603b";

export const fetchNewsData = async (url = "top-headlines?country=us") => {
  try {
    const upadateURL = `${url}&apikey=${API_KEY}`;
    const response = await newsApiInstance.get(upadateURL);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
