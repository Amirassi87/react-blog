import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { UserContext } from '../pages/AuthContextProvider';
import Loader from './Loader';
import ArticleError from './ArticleError';
import { useLoaderData } from 'react-router-dom';

function EditArticle() {
	const article = useLoaderData();

	const { user } = useContext(UserContext);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const api_key = user.user.token;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: article.title,
			desc: article.description,
			body: article.body,
		},
	});

	const onSubmit = (formData) => {
		setLoading(true);
		fetch(`https://realworld.habsida.net/api/articles/${article.slug}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${api_key}`,
			},
			body: JSON.stringify({
				article: {
					title: formData.title,
					description: formData.desc,
					body: formData.body,
				},
			}),
		})
			.then((response) => {
				if (!response.ok) {
					throw Error('Could not update the article');
				}
				return response.json();
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

	if (error)
		return (
			<ArticleError
				onTry={() => {
					setError(null);
				}}
				error={error}
			/>
		);

	if (!user) {
		return <Navigate to="/" replace />;
	}
	return (
		<div className="article-full">
			<p className="title">Edit article</p>
			<div className="article-form">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="article-form-title">
						<label htmlFor="title">Title</label>
						<input
							id="title"
							type="text"
							{...register('title', { required: 'This field is required' })}
							placeholder="Title"
						></input>
						<span>{errors.title?.message}</span>
					</div>
					<div className="desc">
						<label htmlFor="desc">Short description</label>
						<input
							id="desc"
							type="text"
							{...register('desc', {
								required: 'This field is required',
							})}
							placeholder="Short description"
						></input>
						<span>{errors.desc?.message}</span>
					</div>
					<div className="body">
						<label htmlFor="body">Text</label>
						<textarea
							id="body"
							{...register('body', { required: 'This field is required' })}
							placeholder="Body"
						></textarea>
						<span>{errors.body?.message}</span>
					</div>

					<div className="send">
						<input type="submit" name="send" value="Save" />
					</div>
				</form>
			</div>
		</div>
	);
}

export const ArticleLoader = async ({ params }) => {
	const { slug } = params;
	const res = await fetch(`https://realworld.habsida.net/api/articles/${slug}`);

	if (!res.ok) {
		throw Error('Could not find the article');
	}

	const data = await res.json();
	return data.article;
};

export default EditArticle;
