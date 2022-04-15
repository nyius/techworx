import React, { useState, useContext, useEffect } from 'react';
import { FaPlus, FaGripVertical } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import AmountField from './AmountField';
import ProjectsContext from '../../context/projects/ProjectContext';
import _ from 'lodash';
import { useFocus } from '../../hooks/useFocus';
import { useMountEffect } from '../../hooks/inputMount';
import { UpdateProject } from '../../context/projects/ProjectsActions';

function ProjectFields({ field, page, project, projectIndex, handleAddField, projectName = 'Untitled Project' }) {
	const { dispatch } = useContext(ProjectsContext);

	// this is to handle setting input when adding a new field ------------------------------------------------------------//
	const [inputRef, setInputRef] = useFocus();
	useMountEffect(setInputRef);

	// get various values to use------------------------------------------------------------------------------------------//
	const numValues = _.cloneDeep(project.pages[page][field][1]);
	let fieldName = project.pages[page][field][0];
	let fieldMeterChecked = _.cloneDeep(project.pages[page][field][2]);

	// Calculate our totals ----------------------------------------------------------------------------------------------//
	let total = numValues.reduce((acc, cur) => {
		if (cur === '') {
			return acc;
		} else {
			return acc + cur;
		}
	});

	// This is to change the Field name whenever a field is deleted (otherwise they wouldn't update)
	useEffect(() => {
		inputRef.current.value = fieldName;
	}, [fieldName]);

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

	// handles what happens when a user delets a field---------------------------------------------------------------------------------------------------//
	const handleDeleteField = async () => {
		await dispatch({
			type: 'REMOVE_FIELD',
			payload: { projectName, page, field, projectIndex },
		});
		UpdateProject(project, dispatch, projectIndex);
	};

	// handles what happened when the user is selected on a field name and presses enter--------------------------------------------------------------------------------------//
	const handleEnterKey = e => {
		if (e.key === 'Enter') {
			if (fieldName === '') {
				return;
			}
			handleAddField();
			setInputRef();
		}
	};

	// Handle what happens when the meter checkbox is clicked. Gets flipped in the reducer-------------------------------------------------------------------------------------//
	const handleMeterBoxChange = async () => {
		await dispatch({
			type: 'SET_METER_CHECKED',
			payload: { projectName, page, field, projectIndex },
		});

		UpdateProject(project, dispatch, projectIndex);
	};

	//---------------------------------------------------------------------------------------------------//
	return (
		<div className="mt-4 flex flex-col xl:grid xl:grid-cols-12 gap-6 basis-4/6">
			{/* Field Name */}
			<div className="col-span-5 lg:col-span-7">
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

				{/* Add new amount button */}
				<button
					className={`btn btn-block btn-sm border-none flex justify-center items-center bg-base-200 rounded-lg shadow-md mt-1 hover:bg-success text-accent hover:text-base-200`}
					onClick={handeNewAmount}
					data-bs-toggle="tooltip"
					data-bs-placement="top"
					title="Add a new amount"
				>
					<FaPlus className="" />
				</button>
			</div>

			{/* ------------------------------------------------------------------------ */}
			{/* Page Total */}
			<div className="col-span-2 ">
				<label htmlFor="" className="input-group cursor-pointer h-8">
					<span className="bg-neutral-focus text-base-100">=</span>
					<div className=" flex justify-center items-center rounded-r-lg h-8 w-full  bg-base-100 h-8">
						{total}
					</div>

					{/* Delete Field Button */}

					<label
						className="w-6 p-1 bg-base-200 flex justify-center items-center hover:bg-error hover:text-base-300 cursor-pointer"
						htmlFor="delete-field-modal"
						data-bs-toggle="tooltip"
						data-bs-placement="top"
						title="Delete field"
					>
						<ImCross className="w-3 h-3" />
					</label>
				</label>
			</div>
			<div className="cols-span-1 flex flex-row justify-center">
				<input
					type="checkbox"
					className="checkbox mr-2 "
					checked={fieldMeterChecked}
					onChange={handleMeterBoxChange}
					data-bs-toggle="tooltip"
					data-bs-placement="top"
					title="Is this field measured in m?"
				/>
				<p className="">m</p>
			</div>
			<div className="divider xl:hidden"></div>

			{/* ----------------------------------- Delete Field Modal----------------------------------- */}
			<input type="checkbox" id="delete-field-modal" className="modal-toggle" />
			<label htmlFor="delete-field-modal" className="modal">
				<label className="modal-box relative flex flex-col">
					<label htmlFor="delete-field-modal" className="btn btn-sm btn-circle absolute right-2 top-2">
						X
					</label>
					<p className="text-lg text-accent-content mt-5">Are you sure you want to delete this field?</p>
					<label htmlFor="delete-field-modal" className="btn btn-sm btn-accent my-5">
						CANCEL
					</label>

					<label
						htmlFor="delete-field-modal"
						className="btn btn-sm btn-outline btn-error "
						onClick={handleDeleteField}
					>
						DELETE
					</label>
				</label>
			</label>
		</div>
	);
}

export default ProjectFields;
