import { createContext, useReducer, useEffect } from 'react';
import ProjectsReducer from './ProjectsReducer';
import { GetProjects } from './ProjectsActions';

const ProjectsContext = createContext();

/**
 * Context that handles the current project.
 * @param {*} param0
 * @returns
 */
export const ProjectsProvider = ({ children }) => {
	const loggedIn = localStorage.getItem('loggedIn');

	// Initial State ---------------------------------------------------------------------------------------------------//
	const initialState = {
		projects: [],
		loading: true,
	};

	// Ig the user is logged in, get all the projects.
	useEffect(() => {
		if (loggedIn) GetProjects(dispatch);
	}, []);

	const [state, dispatch] = useReducer(ProjectsReducer, initialState);

	//---------------------------------------------------------------------------------------------------//

	return <ProjectsContext.Provider value={{ ...state, loggedIn, dispatch }}>{children}</ProjectsContext.Provider>;
};

export default ProjectsContext;
