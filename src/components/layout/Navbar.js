import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { startLogout } from '../../context/auth/AuthActions';
import Alert from './Alert';
import AuthContext from '../../context/auth/AuthContext';
import { createNewProjectAndNavigate } from '../../context/projects/ProjectsActions';
import ProjectsContext from '../../context/projects/ProjectContext';

function Navbar() {
	const { logout } = useContext(AuthContext);
	const { dispatch: dispatchProject } = useContext(ProjectsContext);
	let navigate = useNavigate();
	const { pathname } = useLocation();

	const handleLogout = () => {
		navigate('/');
		logout();
		startLogout();
	};

	return (
		<div>
			<div className="navbar h-1 flex-col md:flex-row shadow-lg bg-base-100 px-10">
				<div className="flex-1 m-0 md:m-2">
					<button
						className="btn btn-ghost normal-case btn-lg text-xl"
						onClick={() => navigate('/dashboard', { state: pathname.replace('/project/', '') })}
					>
						TechworX
					</button>
				</div>
				<div className="flex flex-col md:flex-row items-center justify-center">
					<button
						className="btn btn-lg btn-ghost"
						onClick={() => navigate('/dashboard', { state: pathname.replace('/project/', '') })}
					>
						Dashboard
					</button>

					<button
						className="btn btn-lg btn-ghost"
						onClick={() => createNewProjectAndNavigate(navigate, dispatchProject)}
					>
						New Project
					</button>

					<label htmlFor="logout-modal" className="btn btn-outline btn-error btn-sm ml-5 ">
						Logout
					</label>
				</div>
			</div>
			<Alert />
			<input type="checkbox" id="logout-modal" className="modal-toggle" />
			<label htmlFor="logout-modal" className="modal">
				<label className="modal-box relative flex flex-col">
					<label htmlFor="logout-modal" className="btn btn-sm btn-circle absolute right-2 top-2">
						X
					</label>
					<p className="text-lg text-accent-content mt-5">Are you sure you want to logout?</p>
					<label htmlFor="logout-modal" className="btn btn-sm btn-accent my-5">
						CANCEL
					</label>

					<label htmlFor="logout-modal" className="btn btn-sm btn-outline btn-error " onClick={handleLogout}>
						LOGOUT
					</label>
				</label>
			</label>
		</div>
	);
}

export default Navbar;
