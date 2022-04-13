import React, { useState, useEffect, useContext } from 'react';
import { FaPlus } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import AmountField from './AmountField';
import ProjectsContext from '../../context/projects/ProjectContext';

function ProjectFields({
	itemNum,
	field,
	page,
	project,
	projectIndex,
	projectName = 'Untitled Project',
	handleDatabaseUpdate,
}) {
	const { dispatch } = useContext(ProjectsContext);
	// Shows the + button uder the fields to add a new one

	// Calculate our totals
	const numValues = [...project.pages[page].fields[itemNum].values];
	let total = numValues.reduce((acc, cur) => acc + cur);

	//---------------------------------------------------------------------------------------------------//
	const handleNewField = () => {
		numValues.push('');

		dispatch({
			type: 'ADD_VALUE',
			payload: { projectName, page, itemNum, numValues, projectIndex },
		});
	};

	//---------------------------------------------------------------------------------------------------//
	const handleEditFieldName = e => {
		const fieldName = (field[1].name = e.target.value);

		dispatch({
			type: 'SET_FIELD_NAME',
			payload: { projectName, page, itemNum, fieldName, projectIndex },
		});
	};

	const values = field[1].values;

	//---------------------------------------------------------------------------------------------------//
	const handleDeleteField = async () => {
		await dispatch({
			type: 'REMOVE_FIELD',
			payload: { projectName, page, itemNum, projectIndex },
		});
		handleDatabaseUpdate();
	};

	//---------------------------------------------------------------------------------------------------//
	return (
		<div className="mt-4 grid grid-cols-12 gap-8 basis-4/6">
			{/* Field Name */}
			<div className="col-span-6">
				<label htmlFor="" className="input-group ">
					<span className="bg-base-200">Field</span>
					<input
						type="text"
						className="input w-full w-full bg-base-100 "
						placeholder="eg. New Trench/Bore"
						defaultValue={field[1].name}
						onChange={handleEditFieldName}
						onBlur={handleDatabaseUpdate}
					/>
				</label>
			</div>

			{/* ------------------------------------------------------------------------ */}
			{/* Field Amount */}
			<div className="col-span-3">
				{values.map((value, i) => {
					return (
						<AmountField
							key={i}
							value={value}
							fieldName={field[0]}
							itemNum={itemNum}
							page={page}
							amountIndex={i}
							project={project}
							projectIndex={projectIndex}
							projectName={projectName}
							handleDatabaseUpdate={handleDatabaseUpdate}
						/>
					);
				})}

				{/* Add new field button */}
				<button
					className={`btn btn-block btn-sm border-none flex justify-center items-center bg-base-200 rounded-lg shadow-md mt-1 hover:bg-success hover:text-base-300`}
					onClick={handleNewField}
				>
					<FaPlus />
				</button>
			</div>

			{/* ------------------------------------------------------------------------ */}
			{/* Page Total */}
			<div className="col-span-3 mr-4">
				<label htmlFor="" className="input-group">
					<span className="bg-base-200">Total</span>
					<div className=" flex justify-center items-center h-12 w-full max-w-sm bg-base-100">{total}</div>

					{/* Delete Field Button */}
					<span
						className="w-6 p-1 bg-base-200 hover:bg-error hover:text-base-300 cursor-pointer"
						onClick={handleDeleteField}
					>
						<ImCross />
					</span>
				</label>
			</div>
		</div>
	);
}

export default ProjectFields;
