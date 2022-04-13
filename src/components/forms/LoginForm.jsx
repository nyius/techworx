import React, { useContext } from 'react';
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';
import { startEmailLogin } from '../../context/auth/AuthActions';
import { useNavigate } from 'react-router-dom';

import validator from 'validator';

function LoginForm() {
	const { setAlert } = useContext(AlertContext);
	const { login } = useContext(AuthContext);
	let navigate = useNavigate();

	//---------------------------------------------------------------------------------------------------//
	const handleSubmit = async e => {
		e.preventDefault();
		const email = e.target.email.value;

		if (!email || !validator.isEmail(email)) {
			setAlert('Please enter a valid email', 'error');
		} else {
			const uid = await startEmailLogin(email, e.target.password.value);

			if (!uid) {
				setAlert('Account not found. Please try again', 'error');
			} else {
				login(uid);
				navigate('/dashboard');
			}
		}
	};
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
