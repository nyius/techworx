const ProjectsReducer = (state, action) => {
	switch (action.type) {
		case 'GET_PROJECTS':
			return {
				...state,
				projects: action.payload,
			};
		case 'ADD_VALUE':
			const addValueState = { ...state };
			addValueState.projects[action.payload.projectIndex].pages[action.payload.page][action.payload.field][1] =
				action.payload.numValues;

			return addValueState;
		case 'ADD_FIELD':
			console.log(action.payload);
			const addFieldState = { ...state };
			addFieldState.projects[action.payload.projectIndex].pages[action.payload.page] = action.payload.fields;

			return addFieldState;
		case 'ADD_PROJECT':
			const addProjectState = { ...state };
			addProjectState.projects = [...addProjectState.projects, action.payload];

			return addProjectState;
		case 'REMOVE_VALUE':
			const removeValueState = { ...state };
			removeValueState.projects[action.payload.projectIndex].pages[action.payload.page][action.payload.field][1] =
				action.payload.numValues;

			return removeValueState;
		case 'REMOVE_FIELD':
			const newProjects = { ...state };
			delete newProjects.projects[action.payload.projectIndex].pages[action.payload.page][action.payload.field];

			return newProjects;
		case 'SET_NAME':
			const setNameState = { ...state };

			setNameState.projects[action.payload.projectIndex].projectName = action.payload.projectName;

			return setNameState;
		case 'SET_FIELD_NAME':
			const setFieldNameState = { ...state };

			setFieldNameState.projects[action.payload.projectIndex].pages[action.payload.page][
				action.payload.field
			][0] = action.payload.newFieldName;

			return setFieldNameState;
		case 'SET_VALUE':
			const setValueState = { ...state };

			setValueState.projects[action.payload.projectIndex].pages[action.payload.page][action.payload.field][1] =
				action.payload.numValues;

			return setValueState;
		default:
			return state;
	}
};

export default ProjectsReducer;
