import React, { useContext } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { startLogout } from '../../context/auth/AuthActions';
import Alert from './Alert';
import AuthContext from '../../context/auth/AuthContext';
import { createNewProjectAndNavigate } from '../../context/projects/ProjectsActions';
import ProjectsContext from '../../context/projects/ProjectContext';

function Navbar() {
	const { logout } = useContext(AuthContext);
	const { dispatch: dispatchProject } = useContext(ProjectsContext);
	let navigate = useNavigate();

	const handleLogout = () => {
		logout();
		startLogout();
	};

	return (
		<div>
			<div className="navbar flex-col md:flex-row shadow-lg bg-base-100 px-10">
				<div className="flex-1 m-2">
					<Link to="/dashboard" className="btn btn-ghost normal-case btn-lg text-xl">
						TechworX
					</Link>
				</div>
				<div className="flex flex-col md:flex-row items-center justify-center">
					<Link to="/dashboard" className="btn btn-lg btn-ghost">
						Dashboard
					</Link>

					<button
						className="btn btn-lg btn-ghost"
						onClick={() => createNewProjectAndNavigate(navigate, dispatchProject)}
					>
						New Project
					</button>

					<Link to="/" className="btn btn-outline btn-error btn-sm ml-5 " onClick={handleLogout}>
						Logout
					</Link>
				</div>
			</div>
			<Alert />
		</div>
	);
}

export default Navbar;
