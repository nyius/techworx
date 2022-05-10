import { createContext, useReducer } from 'react';
import AlertReducer from './AlertReducer';

const AlertContext = createContext();

/**
 * Context for displaying Alerts.
 * @param {*} param0
 * @returns
 */
export const AlertProvider = ({ children }) => {
	const initialState = null;

	const [state, dispatch] = useReducer(AlertReducer, initialState);

	/**
	 * Handles displaying alerts to the users.
	 * Expects a message (msg), and a alert type (success, error) used for styling.
	 * @param {*} msg
	 * @param {*} type
	 */
	const setAlert = (msg, type) => {
		dispatch({
			type: 'SET_ALERT',
			payload: { msg, type },
		});

		setTimeout(() => dispatch({ type: 'REMOVE_ALERT' }), 3000);
	};

	return <AlertContext.Provider value={{ alert: state, setAlert }}>{children}</AlertContext.Provider>;
};

export default AlertContext;
