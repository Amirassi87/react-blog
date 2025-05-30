import { Link, useRouteError } from 'react-router-dom';

export default function ArticleError({ onTry, error }) {
	const routeError = useRouteError();
	return (
		<div className="error">
			<h2>Error </h2>
			<p>{error?.message ?? routeError?.message ?? 'Unknown error occurred'}</p>
			<button onClick={onTry} className="try-btn">
				Try Again
			</button>
		</div>
	);
}
