import React from 'react';
import { useLocation } from 'react-router-dom';
import AccountSetupForm from '../components/forms/AccountSetupForm';

function CreateAccount() {
	let location = useLocation();
	const uid = location.state;

	//---------------------------------------------------------------------------------------------------//
	return (
		<div className="mx-auto w-11/12 sm:w-11/12 md:w-11/12 lg:w-11/12 xl:w-1/4 bg-base-100 h-fit rounded-xl shadow-xl">
			<div className="flex items-center justify-center bg-success w-full h-16 rounded-t-xl shadow-xl">
				<p className="text-2xl text-white font-bold">Account Setup</p>
			</div>
			<div className="p-10">
				{/* Account Setup Form */}
				{/* Pass in the current account UID */}
				<AccountSetupForm uid={uid} />
			</div>
		</div>
	);
}

export default CreateAccount;
