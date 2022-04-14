const ProjectsReducer = (state, action) => {
	switch (action.type) {
		case 'GET_PROJECTS':
			return {
				...state,
				projects: action.payload,
				loading: false,
			};
		case 'ADD_VALUE':
			const addValueState = { ...state };
			addValueState.projects[action.payload.projectIndex].pages[action.payload.page][action.payload.field][1] =
				action.payload.numValues;

			return addValueState;
		case 'ADD_FIELD':
			const addFieldState = { ...state };

			// give each page the new field
			addFieldState.projects[action.payload.projectIndex].pages.forEach(page => {
				page.push(['', [0], false]);
			});

			return addFieldState;
		case 'ADD_PAGE':
			const addPageState = { ...state };
			addPageState.projects[action.payload.projectIndex].pages = action.payload.pages;

			return addPageState;
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
			newProjects.projects[action.payload.projectIndex].pages.forEach(page => {
				page.splice(action.payload.field, 1);
			});

			return newProjects;
		case 'REMOVE_PAGE':
			const removePageState = { ...state };
			removePageState.projects[action.payload.projectIndex].pages.splice(action.payload.page, 1);

			return removePageState;
		case 'REMOVE_PERMIT':
			const removePermitState = { ...state };

			removePermitState.projects.splice(action.payload.projectIndex, 1);

			return removePermitState;
		case 'SET_NAME':
			const setNameState = { ...state };

			setNameState.projects[action.payload.projectIndex].projectName = action.payload.projectName;

			return setNameState;
		case 'SET_EDIT':
			const setEditState = { ...state };

			setEditState.projects[action.payload.projectIndex].editedDate = action.payload.editedDate;

			return setEditState;
		case 'SET_CUR_OPEN':
			const setCurOpen = { ...state };
			setCurOpen.projects[action.payload.projectIndex].curOpen = false;

			return setCurOpen;
		case 'SET_FIELD_NAME':
			const setFieldNameState = { ...state };

			// update the field name on every page
			setFieldNameState.projects[action.payload.projectIndex].pages.forEach(page => {
				page[action.payload.field][0] = action.payload.newFieldName;
			});

			return setFieldNameState;
		case 'SET_VALUE':
			const setValueState = { ...state };

			setValueState.projects[action.payload.projectIndex].pages[action.payload.page][action.payload.field][1] =
				action.payload.numValues;

			return setValueState;
		case 'SET_METER_CHECKED':
			const setMeterCheckedState = { ...state };

			setMeterCheckedState.projects[action.payload.projectIndex].pages.forEach(page => {
				page[action.payload.field][2] === false
					? (page[action.payload.field][2] = true)
					: (page[action.payload.field][2] = false);
			});

			return setMeterCheckedState;
		default:
			return state;
	}
};

export default ProjectsReducer;
