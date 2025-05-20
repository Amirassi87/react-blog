import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { useLoaderData } from "react-router-dom";
import { format } from "date-fns";
import Markdown from "react-markdown";

export default function ArticleDetails() {
  const article = useLoaderData();

  return (
    <div className="article-full">
      <div key={article.title} className="article-container">
        <div className="article">
          <div className="article-header">
            <p className="article-title">{article.title}</p>
            <p className="aricles-likes">
              <span className="icon">
                <FontAwesomeIcon icon={farHeart} />
              </span>
              <span className="likes-counts">{article.favoritesCount}</span>
            </p>
          </div>
          <div className="tags">
            {article.tagList.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="aricle-summary">{article.description}</div>
        </div>
        <div className="article-author-info">
          <div className="author">
            <p className="author-name">{article.author.username}</p>
            <p className="article-date">
              {format(new Date(article.createdAt), "MMMM dd, yyyy")}
            </p>
          </div>
          <div className="author-img">
            <img
              alt="user image"
              src={
                article.image === null
                  ? "./src/assets/user.png"
                  : article.author.image
              }
            />
          </div>
        </div>
      </div>
      <div className="article-body">
        <Markdown>{article.body}</Markdown>
      </div>
    </div>
  );
}

export const ArticleDetailsLoader = async ({ params }) => {
  const { slug } = params;
  const res = await fetch(
    `https://realworld.habsidev.com/api/articles/${slug}`
  );

  if (!res.ok) {
    <ArticleError />;
  }
  const data = await res.json();
  return data.article;
};
