import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const Article = ({ news }) => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  let article = location.state?.article;
  if (!article && news.length) {
    article = news[parseInt(id)];
  }
  console.log(article);
  console.log(news);

  console.log(id);
  if (!article) {
    return (
      <div>
        <h2>No article found</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }
  console.log(article);
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
