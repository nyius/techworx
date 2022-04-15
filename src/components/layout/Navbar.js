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
			<div className="navbar h-fit lg:h-1 flex-row shadow-lg bg-base-100 px-10">
				<div className="navbar-start lg:hidden">
					<div className="dropdown">
						<label tabIndex="0" className="btn btn-ghost btn-circle">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h7"
								/>
							</svg>
						</label>
						<ul
							tabIndex="0"
							className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
						>
							<li>
								<a onClick={() => navigate('/dashboard', { state: pathname.replace('/project/', '') })}>
									Dashboard
								</a>
							</li>
							<li>
								<a onClick={() => createNewProjectAndNavigate(navigate, dispatchProject)}>
									New Project
								</a>
							</li>
							<li>
								<label htmlFor="logout-modal">Logout</label>
							</li>
						</ul>
					</div>
				</div>
				<div className="flex-1 m-0 md:m-2">
					<button
						className="btn hidden lg:inline-flex btn-ghost normal-case btn-lg text-xl"
						onClick={() => navigate('/dashboard', { state: pathname.replace('/project/', '') })}
					>
						TechworX
					</button>
				</div>
				<div className="flex flex-col md:flex-row items-center justify-center">
					<button
						className="btn btn-lg btn-ghost hidden md:inline-flex "
						onClick={() => navigate('/dashboard', { state: pathname.replace('/project/', '') })}
					>
						Dashboard
					</button>

					<button
						className="btn btn-lg btn-ghost hidden md:inline-flex"
						onClick={() => createNewProjectAndNavigate(navigate, dispatchProject)}
					>
						New Project
					</button>

					<label
						htmlFor="logout-modal"
						className="btn btn-outline btn-error btn-sm ml-5 hidden md:inline-flex"
					>
						Logout
					</label>
				</div>
			</div>
			<Alert />

			{/* Logout Modal */}
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
