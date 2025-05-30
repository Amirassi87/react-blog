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
							<NavLink className="create-article" to="/pages/sign-up">
								Create article
							</NavLink>
							<NavLink to="/pages/profile">
								<div className="user">
									<div className="username">{user.user.username}</div>
									<img
										alt="user image"
										src={user?.user?.image || 'src/assets/user.png'}
									/>
								</div>
							</NavLink>
							<NavLink className="logout-btn" to="/pages/log-out">
								Log Out
							</NavLink>
						</>
					) : (
						<>
							<NavLink to="/pages/sign-in">Sign In</NavLink>
							<NavLink className="signup-btn" to="/pages/sign-up">
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
