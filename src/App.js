import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import './firebase/firebase';
import { ProjectsProvider } from './context/projects/ProjectContext';
import { FiltersProvider } from './context/filters/FiltersContext';
import { AlertProvider } from './context/alert/AlertContext';
import { AuthProvider } from './context/auth/AuthContext';
import AppRoutes from './routes/AppRoutes';

function App() {
	return (
		<AuthProvider>
			<AlertProvider>
				<FiltersProvider>
					<ProjectsProvider>
						<div className="flex flex-col h-screen">
							<Navbar />
							<AppRoutes />
							<Footer />
						</div>
					</ProjectsProvider>
				</FiltersProvider>
			</AlertProvider>
		</AuthProvider>
	);
}

export default App;
