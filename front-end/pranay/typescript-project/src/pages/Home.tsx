import { useState, useEffect, lazy, Suspense, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Skeleton from "@mui/material/Skeleton";
import { dataType } from "../types/cardTypes";
const Card = lazy(() => import("../components/Card"));
import { v4 as uuidv4 } from "uuid";
import useIsVisible from "../hooks/useIsVisible";
import useDebounce from "../hooks/useDebounce";

const Home = () => {
  const [articleData, setArticleData] = useState<dataType[]>([]);
  const [pageNum, SetPageNum] = useState<number>(1);
  const navigate = useNavigate();
  let totalResults = 0;
  const delay = 2000
  const [searchQuery, setSearchQuery] = useState<string>("")

  const lastCard = useRef<HTMLDivElement>(null);

  const debounce = useDebounce({value:searchQuery, delay})


  useEffect(()=>{
    if(debounce.length>2){
        fetchNews()

        console.log(articleData, "afetr search")
    }
  },[debounce])
  

  const fetchNews = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${debounce?debounce:"india"}&apiKey=c482036df2594250b454e3824bde7bcf&page=${pageNum}&pageSize=15`
      );
      totalResults = response.data.totalResults;
      const articles = response.data.articles;

      console.log(response.data, "response data 15 only ");

      const appendedData = articles.map((article: dataType) => {
        if (!article.id) {
          const newId = uuidv4();
          return { ...article, id: newId, isFavourite: false };
        }
        return { ...article };
      });

    

      setArticleData((prev)=>[...prev, ...appendedData])  //giving duplicates because of strict mode
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNews();
    console.log(articleData, "article data state");
  }, [pageNum]);

  const [sortedData, setSortedData] = useState<dataType[]>([])
  

  useEffect(()=>{
    const newData = [...articleData].sort((a1, a2) => {
      const a2Num = Number(a2.isFavourite);
      const a1Num = Number(a1.isFavourite);
      return a2Num - a1Num;
    });

    setSortedData(newData)

    console.log(sortedData, "sorted data")
  
  },[articleData])

  const HandleViewDetails = (id: string) => {
    navigate(`/news-details/${id}`);
  };

  const toggleFavourite = (id: string) => {
    const newData = articleData.map((article: dataType) =>
      id === article.id
        ? { ...article, isFavourite: !article.isFavourite }
        : article
    );
    setArticleData(newData);
  };

  const isLastCardVisible = useIsVisible(lastCard);

  useEffect(() => {
    if (isLastCardVisible && !(sortedData.length === totalResults)) {
      SetPageNum((prev) => prev + 1);
    }
  }, [isLastCardVisible]);

  return (
    <>
    <div className="w-full">
    <div className="w-full flex justify-center"> <input name="searchbar" className="bg-zinc-500 rounded-lg p-1 m-2" onChange={(e)=>setSearchQuery(e.target.value)} value={searchQuery} placeholder="search here.."/></div>
      <div className="h-[calc(100vh-10vh)] overflow-y-scroll grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 justify-items-center p-5 ">
       
       
        {sortedData?.map((data, key) => (
          <Suspense
            key={key}
            fallback={
              <div>
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width={210}
                  height={118}
                  sx={{ bgcolor: "grey.800" }}
                />
                <Skeleton animation="wave" sx={{ bgcolor: "grey.800" }} />
                <Skeleton
                  animation="wave"
                  width="60%"
                  sx={{ bgcolor: "grey.800" }}
                />
              </div>
            }
          >
            <Card
              data={data}
              HandleViewDetails={HandleViewDetails}
              toggleFavourite={toggleFavourite}
            />
          </Suspense>
        ))}

        <div ref={lastCard} className="w-0 h-1"></div>
      </div>
    </div>
     
    </>
  );
};

export default Home;
