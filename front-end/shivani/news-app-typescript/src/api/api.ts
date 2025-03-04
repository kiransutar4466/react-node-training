import axios, { AxiosResponse } from "axios";

export const newsApiInstance = axios.create({
  baseURL: "https://newsapi.org/v2/",
});

const API_KEY = "c670a3c393264c08a33845209961603b";

// Define the type for the API response
interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: ArticleType[];
}

// Define the structure of an article
interface ArticleType {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

// Function to fetch news data
export const fetchNewsData = async (
  url: string = "top-headlines?country=us"
): Promise<NewsApiResponse | undefined> => {
  try {
    const updatedURL = `${url}&apikey=${API_KEY}`;
    const response: AxiosResponse<NewsApiResponse> = await newsApiInstance.get(
      updatedURL
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    return undefined;
  }
};
