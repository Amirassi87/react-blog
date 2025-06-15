import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './AuthContextProvider';
import Loader from '../articles/Loader';
import ArticleError from '../articles/ArticleError';

export default function Profile() {
	const { user, setUser } = useContext(UserContext);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const api_key = user.user.token;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			username: user.user.username,
			email: user.user.email,
			bio: user.user.bio,
			avatar_img: user.user.image,
		},
	});

	const navigate = useNavigate();

	const onSubmit = (formData) => {
		setLoading(true);
		fetch('https://realworld.habsida.net/api/user', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${api_key}`,
			},
			body: JSON.stringify({
				bio: formData.bio,
				email: formData.email,
				image: formData.avatar_img,
				username: formData.username,
			}),
		})
			.then((response) => {
				if (!response.ok) {
					throw Error('Could not update the info');
				}
				return response.json();
			})

			.then((data) => {
				const loginInfo = JSON.stringify(data);
				localStorage.setItem('user', loginInfo);
				setUser(data);
				setLoading(false);
				navigate('/profile');
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
		<div className="register-user">
			<p className="title">Edit Profile</p>
			<div className="register-form">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="user-name">
						<label htmlFor="username">Username</label>
						<input
							id="username"
							type="text"
							{...register('username', {
								required: 'This field is required',
								minLength: { value: 3, message: 'Min length is 3 characters' },
								maxLength: {
									value: 20,
									message: 'Max length is 20 characters',
								},
							})}
							placeholder="Username"
						/>
						<span>{errors.username?.message}</span>
					</div>
					<div className="email">
						<label htmlFor="email">Email address</label>
						<input
							id="email"
							type="text"
							{...register('email', {
								required: 'This field is required',
								pattern: {
									value: /\S+@\S+\.\S+/,
									message: 'Entered value does not match email format',
								},
							})}
							placeholder="Email address"
						/>
						<span>{errors.email?.message}</span>
					</div>

					<div className="bio">
						<label htmlFor="bio">bio</label>
						<input
							id="bio"
							type="text"
							// {...register('bio', {
							// 	required: 'This field is required',
							// 	minLength: { value: 6, message: 'Min length is 6 characters' },
							// 	maxLength: {
							// 		value: 40,
							// 		message: 'Max length is 40 characters',
							// 	},
							// })}
							placeholder="bio"
						/>
						<span>{errors.bio?.message}</span>
					</div>
					<div className="avatar_img">
						<label htmlFor="avatar_img">Avatar image (url)</label>
						<input
							id="avatar_img"
							type="text"
							{...register('avatar_img', {
								required: 'This field is required',
								pattern: {
									value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i,
									message: 'Enter a valid image URL',
								},
							})}
							placeholder="avatar_img"
						/>
						<span>{errors.avatar_img?.message}</span>
					</div>

					<div className="create-user">
						<input type="submit" name="create-user" value="Save" />
					</div>
				</form>
			</div>
		</div>
	);
}
