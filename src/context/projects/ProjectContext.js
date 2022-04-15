import { createContext, useReducer, useEffect } from 'react';
import ProjectsReducer from './ProjectsReducer';
import { GetProjects, dispatchGetProjects } from './ProjectsActions';
import { database } from '../../firebase/firebase';
import { ref, onValue } from 'firebase/database';

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
