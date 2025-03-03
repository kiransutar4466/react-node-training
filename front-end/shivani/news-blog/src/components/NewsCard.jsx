import React from "react";
import { Link } from "react-router-dom";

const NewsCard = ({ article, index }) => {
  return (
    <div className="news-card">
      <Link to={`/article/id=${index}`} state={{ article }}>
        <img loading="lazy" src={article.urlToImage} alt="News" />
        <div className="news-content">
          <div className="news-title">{article.title}</div>
          <div className="news-desc">{article.description}</div>
        </div>
      </Link>
    </div>
  );
};

export default NewsCard;
