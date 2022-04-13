import { database } from '../../firebase/firebase';
import { getDatabase, ref, set, update, remove, onValue, get, child, push } from 'firebase/database';
import { NewProjectBase } from './ProjectNewBase';

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
				console.log(`No projects Available`);
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

// This updates a project ---------------------------------------------------------------------------------------------------//
export const UpdateProject = async (id, updates) => {
	const databaseProjectsRef = ref(database, `projects/${id}`);

	return update(databaseProjectsRef, updates)
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
	}
};
