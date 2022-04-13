import { createContext, useReducer, useEffect, onValue } from 'react';
import ProjectsReducer from './ProjectsReducer';
import { database } from '../../firebase/firebase';
import { GetProjects } from './ProjectsActions';

const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
	// Initial State ---------------------------------------------------------------------------------------------------//
	const initialState = {
		projects: [],
		loading: true,
	};

	const [state, dispatch] = useReducer(ProjectsReducer, initialState);

	// Load all starting projects ---------------------------------------------------------------------------------------------//
	const loadProjects = async () => {
		const projects = await GetProjects();

		dispatch({
			type: 'GET_PROJECTS',
			payload: projects,
		});
	};

	useEffect(() => {
		loadProjects();
	}, []);

	//---------------------------------------------------------------------------------------------------//

	return <ProjectsContext.Provider value={{ ...state, dispatch, loadProjects }}>{children}</ProjectsContext.Provider>;
};

export default ProjectsContext;
