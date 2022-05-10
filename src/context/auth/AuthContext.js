import authReducer from './AuthReducer';
import React, { useReducer, createContext, useEffect } from 'react';

const AuthContext = createContext();

/**
 * Context to handle the current user.
 * @param {*} param0
 * @returns
 */
export const AuthProvider = ({ children }) => {
	const loggedIn = JSON.parse(localStorage.getItem('loggedIn'));

	const initalState = {
		uid: '',
		user: {},
	};

	const [state, dispatch] = useReducer(authReducer, initalState);

	// Check if the use was logged in already.
	// if they are, set the users uid to the local stored value
	// THIS IS DEFINITELY NOT A SECURE WAY TO DO IT. UID PROBABLY SHOULDN'T BE STORED IN LOCAL STORAGE
	useEffect(() => {
		if (loggedIn) {
			dispatch({
				type: 'LOGIN',
				payload: loggedIn,
			});
		}
	}, []);

	// Handle user logging out
	const logout = uid => {
		localStorage.removeItem('loggedIn');
		dispatch({
			type: 'LOGOUT',
			payload: { uid: '' },
		});
	};

	return <AuthContext.Provider value={{ uid: state, dispatch, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
