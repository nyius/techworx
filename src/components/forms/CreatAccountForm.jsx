import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { startEmailRegister } from '../../context/auth/AuthActions';
import validator from 'validator';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AlertContext from '../../context/alert/AlertContext';

function CreatAccountForm() {
	const { setAlert } = useContext(AlertContext);
	let navigate = useNavigate();

	// Password verify ---------------------------------------------------------------------------------------------------//
	const formSchema = Yup.object().shape({
		password: Yup.string().required('Password is required').min(6, 'Password should be 6 or more chararcter long'),
		passwordConfirm: Yup.string()
			.required('You must enter matching passwords')
			.oneOf([Yup.ref('password')], 'Passwords must and should match'),
		email: Yup.string().required('Email is required'),
	});

	const validationOpt = { resolver: yupResolver(formSchema) };

	const { register, handleSubmit, formState } = useForm(validationOpt);

	const { errors } = formState;

	// Submit login ---------------------------------------------------------------------------------------------------//
	const onFormSubmit = async data => {
		if (!data.email || !validator.isEmail(data.email)) {
			setAlert('Please enter a valid email', 'error');
			return;
		} else {
			const newAccount = await startEmailRegister(data);

			if (!newAccount.user) {
				setAlert('Looks like your account already exists!', 'error');
			} else {
				setAlert('Account created successfully!', 'success');
				navigate('/');
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(onFormSubmit)}>
			{/* -------------------------------------------------- */}
			<p className="text-xl font-bold text-neutral-content mb-2">Email</p>
			<input
				name="email"
				type="text"
				placeholder="Email"
				className="input w-full bg-base-300"
				{...register('email')}
			/>
			<div className="invalid-feedback">{errors.email?.message}</div>

			{/* -------------------------------------------------- */}
			<p className="text-xl font-bold text-neutral-content mb-2 mt-5">Password</p>
			<input
				name="password"
				type="password"
				placeholder="Password"
				{...register('password')}
				className={`input w-full bg-base-300 form-control ${errors.password ? 'is-invalid' : ''}`}
			/>
			<div className="invalid-feedback">{errors.password?.message}</div>

			{/* -------------------------------------------------- */}
			<input
				name="passwordConfirm"
				type="password"
				placeholder="Verify Password"
				{...register('passwordConfirm')}
				className={`input w-full mt-5 bg-base-300 form-control ${errors.passwordConfirm ? 'is-invalid' : ''}`}
			/>
			<div className="invalid-feedback">{errors.passwordConfirm?.message}</div>

			<button className="btn btn-wide btn-secondary w-full mt-10" type="submit">
				CREATE ACCOUNT
			</button>
		</form>
	);
}

export default CreatAccountForm;
