import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import Loader from './Loader.jsx';
import ArticleError from './ArticleError';
import { UserContext } from '../pages/AuthContextProvider';

import { format } from 'date-fns';

export default function ArticlesList() {
	const { user } = useContext(UserContext);
	const [loading, setLoading] = useState(true);
	const [articlesList, setArticles] = useState([]);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const numberOfPages = Math.ceil(articlesList.length / 5);
	const articlesPerPage = 5;

	const api_key = user?.user?.token || null;

	const lastArticleIndex = currentPage * articlesPerPage;
	const firstArticleIndex = lastArticleIndex - articlesPerPage;
	const currentArticles = articlesList.slice(
		firstArticleIndex,
		lastArticleIndex
	);

	const divs = [];
	for (let i = 1; i <= numberOfPages; i++) {
		divs.push(i);
	}

	const paginate = (e, number) => {
		e.preventDefault;
		setCurrentPage(number);
	};

	const handleNextPage = () => {
		currentPage === numberOfPages
			? setCurrentPage(1)
			: setCurrentPage(currentPage + 1);
	};

	const handlePrevPage = () => {
		currentPage === 1
			? setCurrentPage(numberOfPages)
			: setCurrentPage(currentPage - 1);
	};

	const fav = (slug) => {
		if (user?.user) {
			setArticles(
				articlesList.map((article) => {
					return article.slug === slug
						? {
								...article,
								favorited: true,
								favoritesCount: article.favoritesCount + 1,
							}
						: article;
				})
			);

			fetch(`https://realworld.habsida.net/api/articles/${slug}/favorite`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${api_key}`,
				},
			})
				.then((response) => {
					if (!response.ok) {
						throw Error('Could not favorite the article');
					}
				})
				.catch((err) => {
					setError(err);
				});
		}
		// else {
		// 	//throw Error('You need to login');
		// 	setError('test');
		// }
	};

	const unfav = (slug) => {
		setArticles(
			articlesList.map((article) => {
				return article.slug === slug
					? {
							...article,
							favorited: false,
							favoritesCount: article.favoritesCount - 1,
						}
					: article;
			})
		);
		fetch(`https://realworld.habsida.net/api/articles/${slug}/favorite`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${api_key}`,
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw Error('Could not unfavorite the article');
				}
			})
			.catch((err) => {
				setError(err);
			});

		//console.log(currentArticles);
	};

	useEffect(() => {
		fetch('https://realworld.habsida.net/api/articles')
			.then((res) => {
				if (!res.ok) {
					throw Error('Could not fetch the articles');
				}
				return res.json();
			})
			.then((data) => {
				setArticles(data.articles);
				setLoading(false);
			})
			.catch((err) => {
				setError(err);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return <Loader />;
	}

	if (error) return <ArticleError error={error} />;

	return (
		<>
			{currentArticles?.map((article) => (
				<div key={article.slug} className="article-full">
					<div key={article.title} className="article-container">
						<div className="article">
							<div className="article-header">
								<p className="article-title">
									<Link to={`/articles/${article.slug}`}>{article.title}</Link>
								</p>
								<p className="articles-likes">
									<span className="icon">
										{article.favorited === false ? (
											<FontAwesomeIcon
												onClick={() => fav(article.slug)}
												icon={farHeart}
											/>
										) : (
											<FontAwesomeIcon
												onClick={() => unfav(article.slug)}
												icon={fasHeart}
											/>
										)}
									</span>
									<span className="likes-counts">{article.favoritesCount}</span>
								</p>
							</div>
							<div className="article-tags">
								{article.tagList.map((tag) => (
									<span key={tag}>{tag}</span>
								))}
							</div>
							<div className="article-summary">{article.description}</div>
						</div>
						<div className="article-author-info">
							<div className="author">
								<p className="author-name">{article.author.username}</p>
								<p className="article-date">
									{' '}
									{format(new Date(article.createdAt), 'MMMM dd, yyyy')}
								</p>
							</div>
							<div className="author-img">
								<img
									alt="user image"
									src={article.author?.image || '/src/assets/user.png'}
								/>
							</div>
						</div>
					</div>
				</div>
			))}
			<div className="paginator">
				<ul>
					<li>
						<a onClick={handlePrevPage} href="#">
							❮
						</a>
					</li>
					{divs.map((number) => (
						<li key={number} className={currentPage === number ? 'active' : ''}>
							<a onClick={(e) => paginate(e, number)} href="#">
								{number}
							</a>
						</li>
					))}
					<li>
						<a onClick={handleNextPage} href="#">
							❯
						</a>
					</li>
				</ul>
			</div>
		</>
	);
}
