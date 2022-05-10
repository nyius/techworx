import FiltersReducer from './FiltersReducer';
import { createContext, useReducer } from 'react';

const FiltersContext = createContext();

/**
 * Context for handling any search terms or filters.
 * @param {*} param0
 * @returns
 */
export const FiltersProvider = ({ children }) => {
	const initialState = {
		sortBy: 'EditedDateDown', //ProjectNameUp, ProjectNameDown,CreatedByDown,CreatedByUp, DateCreatedDown, DateCreatedUp, EditedByUp,EditedByDown, EditedDateUp,EditedDateDown, Edi
		search: '',
	};

	const [state, dispatch] = useReducer(FiltersReducer, initialState);

	return <FiltersContext.Provider value={{ ...state, dispatch }}>{children}</FiltersContext.Provider>;
};

export default FiltersContext;
