import { Link, useRouteError } from "react-router-dom";

export default function ArticleError() {
  const error = useRouteError();

  return (
    <div className="error">
      <h2>Error during fetching the data</h2>
      <p>{error.message}</p>
    </div>
  );
}
