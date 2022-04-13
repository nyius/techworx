import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { startGoogleLogin } from '../context/auth/AuthActions';
import AlertContext from '../context/alert/AlertContext';
import AuthContext from '../context/auth/AuthContext';
import CreatAccountForm from '../components/forms/CreatAccountForm';

function CreateAccount() {
	const { setAlert } = useContext(AlertContext);
	const { login } = useContext(AuthContext);
	let navigate = useNavigate();

	// Handle google login ---------------------------------------------------------------------------------------------------//
	const handleGoogleLogin = async e => {
		e.preventDefault();
		const uid = await startGoogleLogin();

		if (!uid) {
			setAlert('Error logging in', 'Error');
		} else {
			login(uid);
			navigate('/dashboard');
		}
	};

	//---------------------------------------------------------------------------------------------------//

	return (
		<div className="mx-auto w-11/12 sm:w-11/12 md:w-11/12 lg:w-11/12 xl:w-1/4 bg-base-100 h-fit rounded-xl shadow-xl">
			<div className="flex items-center justify-center bg-success w-full h-16 rounded-t-xl shadow-xl">
				<p className="text-2xl text-white font-bold">Create Account</p>
			</div>
			<div className="p-10">
				{/* Create Account Form */}
				<CreatAccountForm />

				{/* Google Login*/}
				<button className="btn btn-wide btn-primary border-none w-full mt-5" onClick={handleGoogleLogin}>
					<FaGoogle className="mr-3" /> LOGIN WITH GOOGLE
				</button>

				{/* Back to login btn */}
				<p className="mt-5">Already have an account?</p>
				<Link to="/">
					<button className="btn btn-wide btn-accent w-full">LOGIN</button>
				</Link>
			</div>
		</div>
	);
}

export default CreateAccount;
