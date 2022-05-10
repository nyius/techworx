import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Routes that are used for users that are logged in
 * @param {*} param0
 * @returns
 */
function PublicRoutes({ children }) {
	const loggedIn = localStorage.getItem('loggedIn');

	// If the use is not logged in, show the children
	// ELse, take them to the dashboard
	// This is so the logged in user cant access the login/create account page
	return !loggedIn ? <>{children}</> : <Navigate to={'/dashboard'} />;
}

export default PublicRoutes;
