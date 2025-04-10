import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

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

interface ArticleProps {
  news: ArticleType[];
}

const Article: React.FC<ArticleProps> = ({ news }) => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  let article: ArticleType | undefined = location.state?.article;

  if (!article && news.length && id) {
    article = news[parseInt(id, 10)];
  }

  if (!article) {
    return (
      <div>
        <h2>No article found</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="article-page">
      <h1>{article.title}</h1>
      <img src={article.urlToImage} alt="News" />

      <div className="article-date">
        <p>
          <strong>Author:</strong> {article.author || "Unknown"}
        </p>
        <p>
          <strong>Published At:</strong>{" "}
          {new Date(article.publishedAt).toLocaleString()}
        </p>
      </div>

      <div className="article-content">
        <p>{article.content || "No additional content available."}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          Read Full Article
        </a>
      </div>
    </div>
  );
};

export default Article;
