import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import Markdown from 'react-markdown';
import { UserContext } from '../pages/AuthContextProvider';
import { useContext, useState } from 'react';
import Modal from '../Modal/Modal';
import Loader from './Loader.jsx';
import ArticleError from './ArticleError';

export default function ArticleDetails() {
	const { user } = useContext(UserContext);
	const article = useLoaderData();
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const api_key = user.user.token;

	const deleteArticle = () => {
		setModalIsOpen(false);
		setLoading(true);
		fetch(`https://realworld.habsida.net/api/articles/${article.slug}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${api_key}`,
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw Error('Could not delete the article');
				}
			})
			.then(() => {
				setLoading(false);
				navigate('/');
			})
			.catch((err) => {
				setError(err);
				setLoading(false);
			});
	};

	if (loading) {
		return <Loader />;
	}

	if (error) return <ArticleError error={error} />;
	return (
		<div className="article-full">
			<div key={article.title} className="article-container">
				<div className="article">
					<div className="article-header">
						<p className="article-title">{article.title}</p>
						<div className="articles-likes">
							<span className="icon">
								<FontAwesomeIcon icon={farHeart} />
							</span>
							<span className="likes-counts">{article.favoritesCount}</span>
						</div>
					</div>
					<div className="article-tags">
						{article.tagList.map((tag) => (
							<span key={tag}>{tag}</span>
						))}
					</div>
					<div className="articles-summary">{article.description}</div>
				</div>
				<div className="article-author-info">
					<div className="author">
						<p className="author-name">{article.author.username}</p>
						<p className="article-date">
							{format(new Date(article.createdAt), 'MMMM dd, yyyy')}
						</p>
					</div>
					<div className="author-img">
						<img
							alt="user image"
							src={article.author?.image || '/src/assets/user.png'}
						/>
					</div>
					{user.user.username === article.author.username ? (
						<div className="article-permission">
							<input
								type="button"
								name="delete"
								value="Delete"
								onClick={() => setModalIsOpen(true)}
							/>

							<Link
								className="edit-article"
								to={`/articles/${article.slug}/edit`}
							>
								Edit
							</Link>
							{modalIsOpen ? (
								<Modal
									deleteArticle={deleteArticle}
									setModalIsOpen={setModalIsOpen}
								/>
							) : (
								''
							)}
						</div>
					) : (
						''
					)}
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
	const res = await fetch(`https://realworld.habsida.net/api/articles/${slug}`);

	if (!res.ok) {
		throw Error('Could not find the article');
	}

	const data = await res.json();
	return data.article;
};
