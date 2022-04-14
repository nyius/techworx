import React, { useState, useEffect, useContext } from 'react';
import { FaPlus, FaCircle, FaGripVertical } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import AmountField from './AmountField';
import ProjectsContext from '../../context/projects/ProjectContext';
import _ from 'lodash';
import { useFocus } from '../../hooks/useFocus';
import { useMountEffect } from '../../hooks/inputMount';
import { UpdateProject } from '../../context/projects/ProjectsActions';

function ProjectFields({ field, page, project, projectIndex, handleAddField, projectName = 'Untitled Project' }) {
	const { dispatch } = useContext(ProjectsContext);

	// For hiding buttons when not hovering --------------------------------------------------------------------------------//
	const [hidden, setHidden] = useState(true);

	// this is to handle setting input when adding a new field ------------------------------------------------------------//
	const [inputRef, setInputRef] = useFocus();
	useMountEffect(setInputRef);

	// get various values to use------------------------------------------------------------------------------------------//
	const numValues = _.cloneDeep(project.pages[page][field][1]);
	let fieldName = project.pages[page][field][0];

	// Calculate our totals ----------------------------------------------------------------------------------------------//
	let total = numValues.reduce((acc, cur) => acc + cur);

	// handle someone adding a new ammount -------------------------------------------------------------------------------//
	const handeNewAmount = () => {
		numValues.push('');

		dispatch({
			type: 'ADD_VALUE',
			payload: { projectName, page, field, numValues, projectIndex },
		});
	};

	// Handle when the field name is changed ----------------------------------------------------------------------------//
	const handleEditFieldName = async e => {
		const newFieldName = (fieldName = e.target.value);

		await dispatch({
			type: 'SET_FIELD_NAME',
			payload: { projectName, page, field, newFieldName, projectIndex },
		});
		UpdateProject(project, dispatch, projectIndex);
	};

	//---------------------------------------------------------------------------------------------------//
	const handleDeleteField = async () => {
		await dispatch({
			type: 'REMOVE_FIELD',
			payload: { projectName, page, field, projectIndex },
		});
		UpdateProject(project, dispatch, projectIndex);
	};

	//---------------------------------------------------------------------------------------------------//
	const handleEnterKey = e => {
		if (e.key === 'Enter') {
			if (fieldName === '') {
				return;
			}
			handleAddField();
			setInputRef();
		}
	};

	//---------------------------------------------------------------------------------------------------//
	return (
		<div className="mt-4 grid grid-cols-12 gap-8 basis-4/6">
			{/* Field Name */}
			<div className="col-span-7">
				<label htmlFor="" className="input-group ">
					<span className="bg-neutral-focus">
						<FaGripVertical className="h-3 w-3 fill-base-100" />
					</span>
					<input
						type="text"
						className="input w-full w-full bg-base-100 input-sm"
						placeholder="eg. New Trench/Bore"
						defaultValue={fieldName}
						onChange={handleEditFieldName}
						onBlur={() => UpdateProject(project, dispatch, projectIndex)}
						onKeyDown={handleEnterKey}
						ref={inputRef}
					/>
				</label>
			</div>

			{/* ------------------------------------------------------------------------ */}
			{/* Field Amount */}
			<div className="col-span-2">
				{numValues.map((value, i) => {
					return (
						<AmountField
							key={i}
							page={page}
							field={field}
							value={value}
							fieldName={fieldName}
							amountIndex={i}
							project={project}
							projectIndex={projectIndex}
							projectName={projectName}
						/>
					);
				})}

				{/* Add new field button */}
				<button
					className={`btn btn-block btn-sm border-none flex justify-center items-center bg-base-200 rounded-lg shadow-md mt-1 hover:bg-success hover:text-base-300`}
					onClick={handeNewAmount}
				>
					<FaPlus />
				</button>
			</div>

			{/* ------------------------------------------------------------------------ */}
			{/* Page Total */}
			<div className="col-span-3 mr-4">
				<label
					htmlFor=""
					className="input-group cursor-pointer h-8"
					onMouseEnter={() => setHidden(false)}
					onMouseLeave={() => setHidden(true)}
				>
					<span className="bg-neutral-focus">=</span>
					<div
						className=" flex justify-center items-center h-8 w-full max-w-sm bg-base-100 h-8"
						onMouseEnter={() => setHidden(false)}
						onMouseLeave={() => setHidden(true)}
					>
						{total}
					</div>

					{/* Delete Field Button */}
					<span
						className={`w-6 p-1 bg-base-200 hover:bg-error hover:text-base-300 cursor-pointer ${
							hidden && 'hidden'
						}`}
						onClick={handleDeleteField}
						onMouseEnter={() => setHidden(false)}
						onMouseLeave={() => setHidden(true)}
					>
						<ImCross />
					</span>
				</label>
			</div>
		</div>
	);
}

export default ProjectFields;
