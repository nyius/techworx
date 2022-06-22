import React, { useContext, useEffect, useState } from 'react';
import { ImCross } from 'react-icons/im';
import ProjectsContext from '../../context/projects/ProjectContext';
import { useFocus } from '../../hooks/useFocus';
import { useMountEffect } from '../../hooks/inputMount';
import { UpdateProject } from '../../context/projects/ProjectsActions';

/**
 * Handles displaying an 'amount' value on a project page, inside of a field.
 * (eg. "new trench/bore" ---> 35m)
 * @param {*} param0
 * @returns Styled JSX
 */
function AmountField({ value = '', page, field, project, amountIndex, projectIndex, projectName }) {
	// Focus state to be used when making a new amount field. Sets the cursor to the newly created input box.
	const [focus, setFocus] = useState(true);

	// Get our projects dispatch
	const { dispatch } = useContext(ProjectsContext);

	// this is to handle setting input when adding a new field
	const [inputRef, setInputRef] = useFocus();
	useMountEffect(setInputRef);

	// Making a copy of our values array
	const numValues = [...project.pages[page][field][1]];

	// This is to change the value a field shows whenever a field is deleted (otherwise they wouldn't update)
	useEffect(() => {
		inputRef.current.value = numValues[amountIndex];
	}, [numValues]);

	//---------------------------------------------------------------------------------------------------//
	/**
	 *  handleswhenever we update an amount field, update our context
	 * expects an event (e). uses e.target.value.
	 * @param {*} e
	 */
	const handleAmountChange = async e => {
		// push our new number to our array
		numValues[amountIndex] = Number(e.target.value);

		// dispatch our information to our context
		await dispatch({
			type: 'SET_VALUE',
			payload: { projectName, page, field, numValues, projectIndex },
		});

		UpdateProject(project, dispatch, projectIndex);
	};

	// ------------------------------------------------------------------------------------//
	/**
	 * Handle deleting an amount field.
	 * Desn't do anything if theres only one amount field.
	 * @param {*} e
	 * @returns nothing if theres only a single amount field.
	 */
	const handleDeleteAmount = async e => {
		if (numValues.length === 1) {
			return;
		} else {
			numValues.splice(amountIndex, 1);
			numValues.filter(Boolean);

			await dispatch({
				type: 'REMOVE_VALUE',
				payload: { projectName, page, field, numValues, projectIndex },
			});
			UpdateProject(project, dispatch, projectIndex);
		}
	};

	// -------------------------------------------------------------------//
	/**
	 * Handle pressing enter to add a new amount.
	 * expects an event (e)
	 * @param {*} e
	 * @returns
	 */
	const handleEnterKey = e => {
		if (e.key === 'Enter') {
			if (numValues[amountIndex] === '') {
				return;
			}

			numValues.push('');

			dispatch({
				type: 'ADD_VALUE',
				payload: { projectName, page, field, numValues, projectIndex },
			});

			setInputRef();
			UpdateProject(project, dispatch, projectIndex);
		}
	};

	//---------------------------------------------------------------------------------------------------//
	return (
		<label
			htmlFor=""
			className="input-group mb-1 "
			onMouseEnter={() => setFocus(false)}
			onMouseLeave={() => setFocus(true)}
		>
			<input
				type="number"
				className="input w-full bg-base-100 input-sm rounded-r-lg placeholder:italic placeholder:text-slate-600"
				placeholder="eg. 145"
				defaultValue={value}
				onChange={e => handleAmountChange(e)}
				onKeyDown={handleEnterKey}
				onBlur={() => UpdateProject(project, dispatch, projectIndex)}
				ref={inputRef}
			/>
			<span
				className={`w-6 p-1 bg-base-200 hover:bg-error hover:text-base-300 cursor-pointer ${focus && 'hidden'}`}
				onClick={e => handleDeleteAmount(e)}
			>
				<ImCross />
			</span>
		</label>
	);
}

export default AmountField;
