import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../pages/AuthContextProvider';
import Loader from './Loader';
import ArticleError from './ArticleError';

function NewArticle() {
	const { user } = useContext(UserContext);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [tags, setTags] = useState([]);
	const [tagVal, setTagVal] = useState('');
	const navigate = useNavigate();

	if (user.user === null) {
		navigate('/');
	}

	const api_key = user.user.token;
	//console.log(tags);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const handleClick = () => {
		if (tagVal !== '') {
			setTags([...tags, tagVal]);
			setTagVal('');
		}
	};

	const handleDel = (tag) => {
		setTags(
			tags.filter((val) => {
				return val !== tag;
			})
		);
	};

	const onSubmit = (formData) => {
		setLoading(true);
		fetch('https://realworld.habsida.net/api/articles', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${api_key}`,
			},
			body: JSON.stringify({
				article: {
					title: formData.title,
					description: formData.desc,
					body: formData.body,
					tagList: tags,
				},
			}),
		})
			.then((response) => {
				if (!response.ok) {
					throw Error('Could not create the article');
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
	return (
		<div className="article-full">
			<p className="title">Create new article</p>
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

					<div className="tags">
						<label htmlFor="tags">Tags</label>
						<ul>
							{tags.map((tag, index) => (
								<li key={index}>
									<p className="tag">{tag}</p>
									<input
										type="button"
										name="delete-tags"
										{...register('tags')}
										value="Delete"
										onClick={() => handleDel(tag)}
									/>
								</li>
							))}
						</ul>
						<input
							name="tags"
							id="tags"
							type="text"
							placeholder="Tag"
							value={tagVal}
							onChange={(e) => setTagVal(e.target.value)}
						></input>
						<input
							onClick={handleClick}
							type="button"
							name="add-tags"
							value="Add tag"
						/>
					</div>
					<div className="send">
						<input type="submit" name="send" value="send" />
					</div>
				</form>
			</div>
		</div>
	);
}

export default NewArticle;
