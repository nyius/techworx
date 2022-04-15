import React, { useContext } from 'react';
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';
import { dispatchStartLogin, setUserAccount, startLogin } from '../../context/auth/AuthActions';
import { useNavigate } from 'react-router-dom';

import validator from 'validator';

function LoginForm({ uid }) {
	const { setAlert } = useContext(AlertContext);
	const { dispatch } = useContext(AuthContext);
	let navigate = useNavigate();
	console.log(uid);
	//---------------------------------------------------------------------------------------------------//
	const handleSubmit = async e => {
		e.preventDefault();
		const firstName = e.target.firstName.value;
		const lastName = e.target.lastName.value;

		if (!firstName || !lastName) {
			setAlert(`Please enter first & last name`, `error`);
		} else {
			// first set their new account
			setUserAccount(uid, firstName, lastName).then(() => {
				//then get it
				startLogin(uid, dispatch).then(user => {
					// then diaptch the user
					dispatchStartLogin(uid, user, dispatch);
					setAlert('Account setup complete!', 'success');
					navigate('/dashboard');
				});
			});
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<p className="text-xl font-bold text-neutral-content mb-2">First Name</p>
			<input name="firstName" type="text" placeholder="First name" className="input w-full bg-base-300" />
			<p className="text-xl font-bold text-neutral-content mb-2 mt-5">Last name</p>
			<input name="lastName" type="text" placeholder="Last name" className="input w-full bg-base-300" />
			<p className="mt-6 mb-2 text-center">Head to dashboard</p>
			<button className="btn btn-wide btn-accent w-full" type="submit">
				SUBMIT
			</button>
		</form>
	);
}

export default LoginForm;
