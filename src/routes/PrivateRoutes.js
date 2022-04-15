import React, { useContext } from 'react';
import AuthContext from '../context/auth/AuthContext';
import { Navigate } from 'react-router-dom';

function PrivateRoutes({ children }) {
	const { uid } = useContext(AuthContext);
	const loggedIn = localStorage.getItem('loggedIn');

	return loggedIn ? <>{children}</> : <Navigate to="/" />;
}

export default PrivateRoutes;
