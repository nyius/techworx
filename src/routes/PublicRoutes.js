import React, { useContext } from 'react';
import AuthContext from '../context/auth/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

function PublicRoutes({ children }) {
	const loggedIn = localStorage.getItem('loggedIn');

	return !loggedIn ? <>{children}</> : <Navigate to={'/dashboard'} />;
}

export default PublicRoutes;
