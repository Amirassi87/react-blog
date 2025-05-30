import { NavLink } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from './AuthContextProvider';

export default function LogOut() {
	const { setUser } = useContext(UserContext);

	useEffect(() => {
		localStorage.removeItem('user');
		setUser(null);
	}, [setUser]);

	return (
		<div className="logout">
			<h2>Logged Out</h2>
			<nav>
				<NavLink to="/">Go to Homepage</NavLink>
			</nav>
		</div>
	);
}
