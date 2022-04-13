import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import CreateAccount from '../pages/CreateAccount';
import NotFound from '../pages/NotFound';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import NewProject from '../pages/NewProject';
import React from 'react';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import Project from '../pages/Project';

function AppRoutes() {
	return (
		<Routes>
			<Route
				exact
				path="/"
				element={
					<PublicRoutes>
						<Login />
					</PublicRoutes>
				}
			/>
			<Route
				exact
				path="/create_account"
				element={
					<PublicRoutes>
						<CreateAccount />
					</PublicRoutes>
				}
			/>

			<Route
				exact
				path="/dashboard"
				element={
					<PrivateRoutes>
						<Dashboard />
					</PrivateRoutes>
				}
			/>

			<Route
				exact
				path="/new_project"
				element={
					<PrivateRoutes>
						<NewProject />
					</PrivateRoutes>
				}
			/>

			<Route
				path="/project/:id"
				element={
					<PrivateRoutes>
						<Project />
					</PrivateRoutes>
				}
			/>

			<Route
				path="/*"
				element={
					<PrivateRoutes>
						<NotFound />
					</PrivateRoutes>
				}
			/>
		</Routes>
	);
}

export default AppRoutes;
