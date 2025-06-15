import { useForm } from 'react-hook-form';
import { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './AuthContextProvider';
import Loader from '../articles/Loader.jsx';
import ArticleError from '../articles/ArticleError';

export default function SignUp() {
	const { setUser } = useContext(UserContext);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const {
		register,
		handleSubmit,
		trigger,
		watch,
		formState: { errors },
	} = useForm({
		mode: 'onTouched',
		defaultValues: {
			username: '',
			email: '',
			password: '',
			repeat: '',
			consent: false,
		},
	});

	const [password] = watch(['password']);

	const navigate = useNavigate();
	const touchedFields = useRef({});

	useEffect(() => {
		if (touchedFields.current.repeat) {
			trigger('repeat');
		}
	}, [password, trigger]);

	const onSubmit = (formData) => {
		setLoading(true);
		fetch('https://realworld.habsida.net/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				user: {
					username: formData.username,
					email: formData.email,
					password: formData.password,
				},
			}),
		})
			.then((res) => {
				if (!res.ok) throw Error('Signup not successful, Try again');
				return res.json();
			})
			.then((data) => {
				const loginInfo = JSON.stringify(data);
				localStorage.setItem('user', loginInfo);
				setUser(data);
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
		<div className="register-user">
			<p className="title">Create new account</p>
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
							type="email"
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

					<div className="password">
						<label htmlFor="password">Password</label>
						<input
							id="password"
							type="password"
							{...register('password', {
								required: 'This field is required',
								minLength: { value: 6, message: 'Min length is 6 characters' },
								maxLength: {
									value: 40,
									message: 'Max length is 40 characters',
								},
							})}
							placeholder="Password"
						/>
						<span>{errors.password?.message}</span>
					</div>
					<div className="repeat-password">
						<label htmlFor="repeat">Repeat Password</label>
						<input
							id="repeat"
							type="password"
							{...register('repeat', {
								required: 'This field is required',
								validate: (value) =>
									value === password || 'Passwords do not match',
								minLength: { value: 6, message: 'Min length is 6 characters' },
								maxLength: {
									value: 40,
									message: 'Max length is 40 characters',
								},
							})}
							placeholder="Password"
						/>
						<span>{errors.repeat?.message}</span>
					</div>
					<div className="consent">
						<input
							id="consent"
							type="checkbox"
							{...register('consent', { required: 'This field is required' })}
						/>

						<label htmlFor="consent">
							I agree to the processing of my personal information
						</label>
						<span>{errors.consent?.message}</span>
					</div>
					<div className="create-user">
						<input type="submit" name="create-user" value="Create" />
						<label>
							Already have an account?
							<span>
								<Link to={`/sign-in`}>Sign In</Link>
							</span>
						</label>
					</div>
				</form>
			</div>
		</div>
	);
}
