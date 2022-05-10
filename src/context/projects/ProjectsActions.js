import { database } from '../../firebase/firebase';
import { ref, update, remove, get, child, push, onValue } from 'firebase/database';
import { NewProjectBase } from './ProjectNewBase';
import moment from 'moment';
import _ from 'lodash';

// ------------------------------------------------------------------------------------------------//
/**
 * Listener for project updates on the DB.
 * When a project is updated on the database, we need to pull it from the database so the current user has all updates.
 * @param {*} dispatchProject
 */
export const databaseProjectListener = dispatchProject => {
	const databaseProjectsRef = ref(database, `projects/`);

	onValue(
		databaseProjectsRef,
		dataSnapshot => {
			const dataProjects = [];
			const data = dataSnapshot.val();

			for (const proj in data) {
				dataProjects.push(data[proj]);
			}
			dispatchGetProjects(dataProjects, dispatchProject);
		},
		{
			onlyOnce: false,
		}
	);
};

// ---------------------------------------------------------------------------------------------------//
/**
 * Set projects local storage.
 * Expects an array of projects.
 * @param {array} projects
 */
export const setProjectsLocalStorage = projects => {
	localStorage.setItem('projects', JSON.stringify(projects));
};

// ---------------------------------------------------------------------------------------------------//
/**
 * Handles getting projects from our context.
 * Expects projects (array), and a dispatch for projects Context.
 * @param {array} projects
 * @param {*} dispatch
 * @returns
 */
export const dispatchGetProjects = (projects, dispatch) =>
	new Promise((resolve, reject) => {
		dispatch({
			type: 'GET_PROJECTS',
			payload: projects,
		});
		resolve();
	});

// ---------------------------------------------------------------------------------------------------//
/**
 * This gets all projects.
 * Expects a dispatch from projects context.
 * @param {*} dispatch
 * @returns an array of projects
 */
export const GetProjects = async dispatch => {
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

				// Set the projects in localStorage
				setProjectsLocalStorage(projects);
				// Add projects to context
				dispatchGetProjects(projects, dispatch);

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

// ---------------------------------------------------------------------------------------------------//
/**
 * This gets a single project when loading a proejct page.
 * Expects a project id (key)
 * @param {*} key
 * @returns the project from the database
 */
export const GetProject = async key => {
	const databaseProjectsRef = ref(database, `projects/${key}`);

	return get(databaseProjectsRef)
		.then(snapshot => {
			if (snapshot.exists()) {
				return snapshot.val();
			}
		})
		.catch(error => {
			console.log(error);
			return error;
		});
};

// ---------------------------------------------------------------------------------------------------//
/**
 * Updates our "editedDate and editedBy" properties on a permit.
 * Expects the index of the project (index being the array position of the project in the projects array in the projects context), the projects context dispatch, and the full user from auth context.
 * @param {*} projectIndex
 * @param {*} dispatch
 * @param {*} user
 */
export const updateLastEdited = (projectIndex, dispatch, user) => {
	const editedDate = moment();
	const { firstName, lastName } = user;

	dispatch({
		type: 'SET_EDIT',
		payload: { projectIndex, editedDate: editedDate.valueOf(), firstName, lastName },
	});
};

// ---------------------------------------------------------------------------------------------------//
/**
 * handles updating a project anything something is changed.
 * Expects the full project (object), the projects contect dispatch, and the index position of the project on the projects context array.
 * @param {object} project
 * @param {*} dispatch
 * @param {*} projectIndex
 * @returns an error if something goes wrong.
 */
export const UpdateProject = async (project, dispatch, projectIndex) => {
	const databaseProjectsRef = ref(database, `projects/${project.id}`);
	const user = JSON.parse(localStorage.getItem('loggedIn'))[1];

	// set the editedDate/By values
	updateLastEdited(projectIndex, dispatch, user);

	return update(databaseProjectsRef, project)
		.then(e => {})
		.catch(error => {
			console.log(error);
			return error;
		});
};

// ---------------------------------------------------------------------------------------------------//
/**
 * Handles creation of a new project on the database.
 * Expects a project (object)
 * @param {object} project
 * @returns databse key for the newly created project
 */
export const SetNewProject = async project => {
	const databaseProjectsRef = ref(database, `projects/`);

	const key = push(databaseProjectsRef).key;

	const databaseProjectRef = ref(database, `projects/${key}`);
	update(databaseProjectRef, { ...project, id: key });
	return key;
};

// --------------------------------------------------//
/**
 * This dispatches our project to our context (neccessary as a promise function so we don't navigate away until this is done).
 * Expects a project (object), and a dispatch from the projects context.
 * @param {object} newProject
 * @param {*} dispatch
 * @returns a promise
 */
export const dispatchNewProject = (newProject, dispatch) =>
	new Promise((resolve, reject) => {
		dispatch({
			type: 'ADD_PROJECT',
			payload: newProject,
		});
		resolve();
	});

// ---------------------------------------------------------------------------------//
/**
 * This combines functions to create a new project in the DB, set it in our context, and then navigate to it.
 * Navigates to new project page on success.
 * Expects our navigate function and projects context dispatch.
 * @param {*} navigate
 * @param {*} dispatchProject
 * @returns an error if something goes wrong.
 */
export const createNewProjectAndNavigate = async (navigate, dispatchProject) => {
	try {
		const localData = localStorage.getItem('loggedIn');
		const data = JSON.parse(localData);
		const user = data[1];
		const firstName = user.firstName;
		const lastName = user.lastName;

		// Create a new base project by cloning our template
		const newProject = _.cloneDeep(NewProjectBase);
		// set createdby and editedby
		newProject.createdBy = `${firstName} ${lastName}`;
		newProject.editedBy = `${firstName} ${lastName}`;

		// set a new project in the database
		const newProjectKey = await SetNewProject(newProject);

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

// ---------------------------------------------------------------------------------------------------//
/**
 * Dispatches our removed permit after we've edited the DB.
 * Expects an array index number for the project (position in the projects context array), and our projects context dispatch.
 * @param {*} projectIndex
 * @param {*} dispatch
 * @returns a promise
 */
export const dispatchRemoveProject = (projectIndex, dispatch) =>
	new Promise((resolve, reject) => {
		dispatch({
			type: 'REMOVE_PERMIT',
			payload: projectIndex,
		});
		resolve();
	});

// ---------------------------------------------------------------------------------------------------//
/**
 * Removes a project and navigates to the home page. combines other functions.
 * Expects a navigatge function, an array index number for the project (position in the projects context array), our projects context dispatch, and permit id
 * @param {*} navigate
 * @param {*} dispatch
 * @param {*} projectIndex
 * @param {*} id
 * @returns error is comething fails
 */
export const removeProjectAndNavigate = async (navigate, dispatch, projectIndex, id) => {
	try {
		const databaseProjectRef = ref(database, `projects/${id}`);

		navigate('/dashboard');
		dispatchRemoveProject(projectIndex, dispatch);
		await remove(databaseProjectRef);
	} catch (error) {
		console.log(error);
		return error;
	}
};

// ---------------------------------------------------------------------------------------------------//
/**
 * Handles setting the current project to open inside of our context.
 * Expects an array index number for the project (position in the projects context array), and our projects context dispatch.
 * @param {*} projectIndex
 * @param {*} dispatch
 * @returns
 */
export const dispatchCurOpen = (projectIndex, dispatch) =>
	new Promise((resolve, reject) => {
		dispatch({
			type: 'SET_CUR_OPEN',
			payload: { projectIndex },
		});
		resolve();
	});
