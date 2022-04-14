import { createContext, useReducer, useEffect, onValue } from 'react';
import ProjectsReducer from './ProjectsReducer';
import { database } from '../../firebase/firebase';
import { GetProjects } from './ProjectsActions';

const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
	const loggedIn = localStorage.getItem('loggedIn');

	// Initial State ---------------------------------------------------------------------------------------------------//
	const initialState = {
		projects: [],
		loading: true,
	};

	useEffect(() => {
		if (loggedIn) GetProjects(dispatch);
	}, []);

	const [state, dispatch] = useReducer(ProjectsReducer, initialState);

	//---------------------------------------------------------------------------------------------------//

	return <ProjectsContext.Provider value={{ ...state, loggedIn, dispatch }}>{children}</ProjectsContext.Provider>;
};

export default ProjectsContext;
