const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				uid: action.payload[0],
				user: action.payload[1],
			};
		case 'LOGOUT':
			return {};
		default:
			return state;
	}
};

export default authReducer;
