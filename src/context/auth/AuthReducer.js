const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				uid: action.payload.uid,
				user: action.payload.user,
			};
		case 'LOGOUT':
			return {};
		default:
			return state;
	}
};

export default authReducer;
