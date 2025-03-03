import React from "react";
import Hero from "../components/Hero";
import NewsCard from "../components/NewsCard";
import { Link } from "react-router-dom";

const Home = ({ news, handleChange }) => {
  return (
    <article className="main-section">
      <Hero handleChange={handleChange} />
      <div className="card-container">
        {news.map((article, index) => {
          return <NewsCard key={index} index={index} article={article} />;
        })}
      </div>
    </article>
  );
};

export default Home;
