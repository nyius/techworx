import React from 'react';
import { Navigate } from 'react-router-dom';

function PublicRoutes({ children }) {
	const loggedIn = localStorage.getItem('loggedIn');

	return !loggedIn ? <>{children}</> : <Navigate to={'/dashboard'} />;
}

export default PublicRoutes;
