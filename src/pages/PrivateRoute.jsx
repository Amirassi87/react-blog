import { UserContext } from './AuthContextProvider';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
	const { user } = useContext(UserContext);

	return user ? children : <Navigate to="/sign-in" replace />;
};

export default PrivateRoute;
