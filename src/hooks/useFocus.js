import { useRef } from 'react';

//---------------------------------------------------------------------------------------------------//
/**
 * Sets the users cursor to the newly created input box
 * @returns
 */
export const useFocus = () => {
	const htmlElRef = useRef(null);
	const setFocus = () => {
		htmlElRef.current && htmlElRef.current.focus();
	};

	return [htmlElRef, setFocus];
};
