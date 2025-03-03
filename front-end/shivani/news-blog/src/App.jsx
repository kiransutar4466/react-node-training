import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import { fetchNewsData } from "./api/api";
import { debounce } from "lodash";
import About from "./pages/About";

const App = () => {
  const [news, setNews] = useState([]);

  const debouncedSearch = debounce(async (query) => {
    const data = await fetchNewsData(`/everything?q=${query}`);
    console.log(data);
    setNews(data.articles);
  }, 400);

  async function handleChange(e) {
    const query = typeof e === "string" ? e : e.target.value;
    debouncedSearch(query);
  }

  useEffect(() => {
    fetchNewsData()
      .then((data) => {
        setNews(data.articles);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <BrowserRouter>
      <Navbar handleChange={handleChange} />
      <Routes>
        <Route
          path="/"
          element={<Home news={news} handleChange={handleChange} />}
        />
        <Route path="/article/:id" element={<Article news={news} />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer handleChange={handleChange} />
    </BrowserRouter>
  );
};

export default App;
