import { NavLink, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../pages/AuthContextProvider';

export default function RootLayout() {
	const { user } = useContext(UserContext);

	return (
		<>
			<header>
				<nav>
					<NavLink className="blog-logo" to="/">
						Realworld Blog
					</NavLink>
					{user ? (
						<>
							<NavLink className="create-article" to="/articles/new-article">
								Create article
							</NavLink>
							<NavLink to="/profile">
								<div className="user">
									<div className="username">{user.user.username}</div>
									<img
										alt="user image"
										src={user?.user?.image || '/src/assets/user.png'}
									/>
								</div>
							</NavLink>
							<NavLink className="logout-btn" to="/log-out">
								Log Out
							</NavLink>
						</>
					) : (
						<>
							<NavLink to="/sign-in">Sign In</NavLink>
							<NavLink className="signup-btn" to="/sign-up">
								Sign Up
							</NavLink>
						</>
					)}
				</nav>
			</header>
			<main>
				<Outlet />
			</main>
		</>
	);
}
