import { database } from '../../firebase/firebase';
import { getDatabase, ref, set, update, remove, onValue, get, child, push } from 'firebase/database';
import { NewProjectBase } from './ProjectNewBase';
import moment from 'moment';

// This gets all projects ---------------------------------------------------------------------------------------------------//
export const GetProjects = async () => {
	const databaseRef = ref(database);

	return get(child(databaseRef, 'projects'))
		.then(snapshot => {
			if (snapshot.exists()) {
				const projects = [];

				snapshot.forEach(project => {
					projects.push({
						id: project.key,
						...project.val(),
					});
				});

				return projects;
			} else {
				const projects = [];

				return projects;
			}
		})
		.catch(error => {
			console.log(error);
			return error;
		});
};

// This gets a single project ---------------------------------------------------------------------------------------------------//
export const GetProject = async key => {
	const databaseProjectsRef = ref(database, `projects/${key}`);

	return get(databaseProjectsRef)
		.then(snapshot => {
			if (snapshot.exists()) {
				const project = snapshot.val();
				return snapshot.val();
			}
		})
		.catch(error => {
			console.log(error);
			return error;
		});
};

// Updates our "editedDate and editedBy" properties on a permit ---------------------------------------------------------------------------------------------------//
export const updateLastEdited = (projectIndex, dispatch) => {
	const editedDate = moment();

	dispatch({
		type: 'SET_EDIT',
		payload: { projectIndex, editedDate: editedDate.valueOf() },
	});
};

// This updates a project ---------------------------------------------------------------------------------------------------//
export const UpdateProject = async (project, dispatch, projectIndex) => {
	const databaseProjectsRef = ref(database, `projects/${project.id}`);

	// set the editedDate/By values
	updateLastEdited(projectIndex, dispatch);

	return update(databaseProjectsRef, project)
		.then(e => {})
		.catch(error => {
			console.log(error);
			return error;
		});
};

// This sets a new project in our database ---------------------------------------------------------------------------------------------------//
export const SetNewProject = async project => {
	const databaseProjectsRef = ref(database, `projects/`);

	const key = push(databaseProjectsRef).key;

	const databaseProjectRef = ref(database, `projects/${key}`);
	update(databaseProjectRef, { ...project, id: key });
	return key;
};

// This dispatches our project to our context (neccessary as a promise function so we don't navigate away until this is done)--------------------------------------------------//
export const dispatchNewProject = (newProject, dispatch) =>
	new Promise((resolve, reject) => {
		dispatch({
			type: 'ADD_PROJECT',
			payload: newProject,
		});
		resolve();
	});

// This combines functions to create a new project in the DB, set it in our context, and then navigate to it---------------------------------------------------------------------------------//
export const createNewProjectAndNavigate = async (navigate, dispatchProject) => {
	try {
		// set a new project in the database
		const newProjectKey = await SetNewProject(NewProjectBase);

		// Get that new project from the database
		await GetProject(newProjectKey).then(newProject => {
			// then load our project into our context
			dispatchNewProject(newProject, dispatchProject).then(() => {
				// then navigate to the new project page
				navigate(`/project/${newProjectKey}`);
			});
		});
	} catch (error) {
		console.log(error);
		return error;
	}
};

// Dispatches our removed permit after we've edited out DB---------------------------------------------------------------------------------------------------//
export const dispatchRemoveProject = (projectIndex, dispatch) =>
	new Promise((resolve, reject) => {
		dispatch({
			type: 'REMOVE_PERMIT',
			payload: projectIndex,
		});
		resolve();
	});

// Removes a project and navigates to the home page. combines other functions---------------------------------------------------------------------------------------------------//
export const removeProjectAndNavigate = async (navigate, dispatch, projectIndex, id) => {
	try {
		const databaseProjectRef = ref(database, `projects/${id}`);

		await remove(databaseProjectRef);
		dispatchRemoveProject(projectIndex, dispatch).then(() => {
			navigate('/dashboard');
		});
	} catch (error) {
		console.log(error);
		return error;
	}
};

// Dispatches our removed permit after we've edited out DB---------------------------------------------------------------------------------------------------//
export const dispatchCurOpen = (projectIndex, dispatch) =>
	new Promise((resolve, reject) => {
		dispatch({
			type: 'SET_CUR_OPEN',
			payload: { projectIndex },
		});
		resolve();
	});
