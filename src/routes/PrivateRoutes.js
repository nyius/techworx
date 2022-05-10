import React, { useContext } from 'react';
import AuthContext from '../context/auth/AuthContext';
import { Navigate } from 'react-router-dom';

/**
 * Handles navigation for private routes
 * @param {*} param0
 * @returns
 */
function PrivateRoutes({ children }) {
	const { uid } = useContext(AuthContext);
	const loggedIn = localStorage.getItem('loggedIn');

	// If the user is logged in, display children
	// Else, take them to login screen (/)
	return loggedIn ? <>{children}</> : <Navigate to="/" />;
}

export default PrivateRoutes;
