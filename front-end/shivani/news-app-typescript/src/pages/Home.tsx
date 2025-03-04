import React from "react";
import Hero from "../components/Hero";
import NewsCard from "../components/NewsCard";

interface ArticleType {
  source: { id: string | null; name: string };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface HomeProps {
  news: ArticleType[];
  handleChange: (query: string) => void;
}

const Home: React.FC<HomeProps> = ({ news, handleChange }) => {
  return (
    <article className="main-section">
      <Hero handleChange={handleChange} />
      <div className="card-container">
        {news.map((article, index) => (
          <NewsCard key={index} index={index} article={article} />
        ))}
      </div>
    </article>
  );
};

export default Home;
