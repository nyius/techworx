import React, { useContext, useState, useEffect } from 'react';
import { ImCross } from 'react-icons/im';
import ProjectsContext from '../../context/projects/ProjectContext';

function AmountField({
	value = '',
	page,
	itemNum,
	project,
	amountIndex,
	projectIndex,
	projectName,
	handleDatabaseUpdate,
}) {
	const [focus, setFocus] = useState(false);

	const { dispatch } = useContext(ProjectsContext);

	// Making a copy of our values array
	const numValues = [...project.pages[page].fields[itemNum].values];

	//---------------------------------------------------------------------------------------------------//
	// whenever we update an amount, modify our context
	const handleAmountChange = async e => {
		// push our new number to our array
		numValues[amountIndex] = Number(e.target.value);

		// dispatch our information to our context
		// context needs to know our project name that we're working on, the page we're on, the item number, and the values
		await dispatch({
			type: 'SET_VALUE',
			payload: { projectName, page, itemNum, numValues, projectIndex },
		});

		handleDatabaseUpdate();
	};

	//---------------------------------------------------------------------------------------------------//
	const handleDeleteField = async () => {
		numValues.splice(amountIndex, 1);

		await dispatch({
			type: 'REMOVE_VALUE',
			payload: { projectName, page, itemNum, numValues, projectIndex },
		});
		handleDatabaseUpdate();
	};

	//---------------------------------------------------------------------------------------------------//
	const handleEnterKey = e => {
		if (e.key === 'Enter') {
			if (numValues[amountIndex] === '') {
				return;
			}

			numValues.push('');

			dispatch({
				type: 'ADD_VALUE',
				payload: { projectName, page, itemNum, numValues, projectIndex },
			});
		}
	};

	//---------------------------------------------------------------------------------------------------//

	return (
		<label htmlFor="" className="input-group mb-1 ">
			<input
				type="number"
				className="input w-full bg-base-100"
				placeholder="eg. 145"
				defaultValue={value}
				onChange={e => handleAmountChange(e)}
				onKeyDown={handleEnterKey}
				onBlur={handleDatabaseUpdate}
				autoFocus
			/>
			<span
				className={`w-6 p-1 bg-base-200 hover:bg-error hover:text-base-300 cursor-pointer`}
				onClick={handleDeleteField}
			>
				<ImCross />
			</span>
		</label>
	);
}

export default AmountField;
