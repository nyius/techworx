import React, { useContext } from 'react';
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';
import { startEmailLogin, startLogin, dispatchStartLogin } from '../../context/auth/AuthActions';
import { useNavigate } from 'react-router-dom';

import validator from 'validator';

/**
 * Handles the Login form
 * @returns Returns JSX that displays the login form
 */
function LoginForm() {
	// Alert Context to display alerts
	const { setAlert } = useContext(AlertContext);
	// Login context to set login info
	const { login, dispatch } = useContext(AuthContext);
	let navigate = useNavigate();

	//---------------------------------------------------------------------------------------------------//
	/**
	 * Handles the submission of the login form.
	 * Expects an event (e).
	 * If the user is successfully logged in, redirects to the dashboard
	 * @param {*} e
	 */
	const handleSubmit = async e => {
		e.preventDefault();
		const email = e.target.email.value;

		if (!email || !validator.isEmail(email)) {
			setAlert('Please enter a valid email', 'error');
		} else {
			const uid = await startEmailLogin(email, e.target.password.value);

			// If theres no uid, have the user try again (maybe wrong pw)
			if (!uid) {
				setAlert('Account not found. Please try again', 'error');
			} else {
				// if there is a uid, start the login process by checking our database for their ID
				startLogin(uid, dispatch).then(user => {
					if (!user) {
						// if the user exists but doesnt exist in our database yet, direct them to account setup
						navigate('/account_setup', { state: uid });
					} else {
						// If they do, send them to the dashboard
						dispatchStartLogin(uid, user, dispatch);
						navigate('/dashboard');
					}
				});
			}
		}
	};

	//----------------------------------------------------------------
	return (
		<form onSubmit={handleSubmit}>
			<p className="text-xl font-bold text-neutral-content mb-2">Email</p>
			<input name="email" type="text" placeholder="Email" className="input w-full bg-base-300" />
			<p className="text-xl font-bold text-neutral-content mb-2 mt-5">Password</p>
			<input name="password" type="password" placeholder="Password" className="input w-full bg-base-300" />
			<button type="submit" className="btn btn-wide btn-accent w-full mt-10">
				LOGIN
			</button>
		</form>
	);
}

export default LoginForm;
