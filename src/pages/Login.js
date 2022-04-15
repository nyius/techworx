import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { startGoogleLogin, startLogin, dispatchStartLogin } from '../context/auth/AuthActions';
import AlertContext from '../context/alert/AlertContext';
import AuthContext from '../context/auth/AuthContext';
import LoginForm from '../components/forms/LoginForm';

function Login() {
	let navigate = useNavigate();

	const { setAlert } = useContext(AlertContext);
	const { dispatch } = useContext(AuthContext);

	//---------------------------------------------------------------------------------------------------//
	const handleGoogleLogin = async e => {
		e.preventDefault();
		const uid = await startGoogleLogin();

		if (!uid) {
			setAlert('Error logging in', 'error');
		} else {
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
			navigate('/dashboard');
		}
	};

	//---------------------------------------------------------------------------------------------------//
	return (
		<div className="mx-auto w-11/12 sm:w-11/12 md:w-11/12 lg:w-11/12 xl:w-1/4 bg-base-100 h-fit rounded-xl shadow-xl">
			<div className="flex items-center justify-center bg-success w-full h-16 rounded-t-xl shadow-xl">
				<p className="text-2xl text-white font-bold">Login</p>
			</div>

			<div className="p-10">
				{/* Email Login Form */}
				<LoginForm />

				{/* Google Login */}
				<button className="btn btn-wide btn-primary border-none w-full mt-5" onClick={handleGoogleLogin}>
					<FaGoogle className="mr-3" /> LOGIN WITH GOOGLE
				</button>

				{/* Create Account Button */}
				<p className="mt-5">Don't have an account yet?</p>
				<Link to={'/create_account'}>
					<button className="btn btn-wide btn-secondary w-full">CREATE ACCOUNT</button>
				</Link>
			</div>
		</div>
	);
}

export default Login;
