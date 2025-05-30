import { useEffect, useState, createContext } from 'react';

export const UserContext = createContext(null);

export default function AuthContextProvider({ children }) {
	const [user, setUser] = useState(() => {
		const login = localStorage.getItem('user');
		return login ? JSON.parse(login) : null;
	});

	useEffect(() => {
		const login = JSON.parse(localStorage.getItem('user'));
		if (login) setUser(login);
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}
