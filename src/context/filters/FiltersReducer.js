const FiltersReducer = (state, action) => {
	switch (action.type) {
		case 'SET_SORTBY':
			return {
				...state,
				sortBy: action.payload,
			};
		case 'SET_SEARCH':
			return {
				...state,
				search: action.payload,
			};
		default:
			return state;
	}
};

export default FiltersReducer;
