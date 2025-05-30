import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { UserContext } from './AuthContextProvider';
import ArticleError from '../articles/ArticleError';
import Loader from '../articles/Loader.jsx';

export default function SignIn() {
	const { setUser } = useContext(UserContext);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const navigate = useNavigate();

	const onSubmit = (formData) => {
		setLoading(true);
		fetch('https://realworld.habsidev.com/api/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				user: {
					email: formData.email,
					password: formData.password,
				},
			}),
		})
			.then((res) => {
				if (!res.ok) {
					throw Error('Login not successful');
				}
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
			<p>Sign In</p>
			<div className="register-form">
				{error && <ArticleError />}
				{loading && <Loader />}
				<form onSubmit={handleSubmit(onSubmit)}>
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

					<div className="create-user">
						<input type="submit" name="login" value="Login" />
						<label>
							Don't have an account?
							<span>
								<Link to={`/pages/sign-up`}>Sign Up</Link>
							</span>
						</label>
					</div>
				</form>
			</div>
		</div>
	);
}
