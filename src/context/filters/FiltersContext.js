import FiltersReducer from './FiltersReducer';
import { createContext, useReducer, useEffect, onValue, Children } from 'react';

const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
	const initialState = {
		sortBy: 'EditedDateDown', //ProjectNameUp, ProjectNameDown,CreatedByDown,CreatedByUp, DateCreatedDown, DateCreatedUp, EditedByUp,EditedByDown, EditedDateUp,EditedDateDown, Edi
		search: '',
	};

	const [state, dispatch] = useReducer(FiltersReducer, initialState);

	return <FiltersContext.Provider value={{ ...state, dispatch }}>{children}</FiltersContext.Provider>;
};

export default FiltersContext;
