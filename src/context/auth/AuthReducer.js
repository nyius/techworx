const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				uid: action.payload,
			};
		case 'LOGOUT':
			return {};
		default:
			return state;
	}
};

export default authReducer;
