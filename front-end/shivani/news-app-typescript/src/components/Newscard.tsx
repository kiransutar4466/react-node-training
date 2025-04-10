import React from "react";
import { Link } from "react-router-dom";

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

interface NewsCardProps {
  article: ArticleType;
  index: number;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, index }) => {
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
