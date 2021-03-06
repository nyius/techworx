import React, { useState, useContext, useEffect } from 'react';
import { FaPlus, FaGripVertical } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import AmountField from './AmountField';
import ProjectsContext from '../../context/projects/ProjectContext';
import _ from 'lodash';
import { useFocus } from '../../hooks/useFocus';
import { useMountEffect } from '../../hooks/inputMount';
import { UpdateProject } from '../../context/projects/ProjectsActions';
import AlertContext from '../../context/alert/AlertContext';

function ProjectFields({ field, page, project, projectIndex, handleAddField, projectName = 'Untitled Project' }) {
	// Get our dispatch for projects context
	const { dispatch } = useContext(ProjectsContext);
	// get our alerts context
	const { setAlert } = useContext(AlertContext);

	// this is to handle setting input when adding a new field ------------------------------------------------------------//
	const [inputRef, setInputRef] = useFocus();
	useMountEffect(setInputRef);

	// get various values to use------------------------------------------------------------------------------------------//
	const numValues = _.cloneDeep(project.pages[page][field][1]);
	let fieldName = project.pages[page][field][0];
	let fieldMeterChecked = _.cloneDeep(project.pages[page][field][2]);
	let fields = project.pages[page].length;

	// Calculate our totals (to be used when displaying each field total) ----------------------------------------------------------------------------------------------//
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

	// -------------------------------------------------------------------------------//
	/**
	 * handle adding a new ammount field.
	 */
	const handeNewAmount = () => {
		if (numValues[numValues.length - 1] !== '') {
			numValues.push('');
			dispatch({
				type: 'ADD_VALUE',
				payload: { projectName, page, field, numValues, projectIndex },
			});
		}
	};

	// ----------------------------------------------------------------------------//
	/**
	 * Handles when the field name is changed.
	 * expects an event (e).
	 * @param {*} e
	 */
	const handleEditFieldName = async e => {
		const newFieldName = (fieldName = e.target.value);

		await dispatch({
			type: 'SET_FIELD_NAME',
			payload: { projectName, page, field, newFieldName, projectIndex },
		});
		UpdateProject(project, dispatch, projectIndex);
	};

	// ---------------------------------------------------------------------------------------------------//
	/**
	 * handles what happens when a user delets a field.
	 * @returns errors if theres only one field left
	 */
	const handleDeleteField = async () => {
		if (fields === 1) {
			setAlert("Can't delete last field", 'error');
			return;
		} else {
			await dispatch({
				type: 'REMOVE_FIELD',
				payload: { projectName, page, field, projectIndex },
			});
			UpdateProject(project, dispatch, projectIndex);
		}
	};

	// --------------------------------------------------------------------------------------//
	/**
	 * handles what happened when the user is selected on a field name and presses enter.
	 * Adds a new field.
	 * Expects an event (e)
	 * @param {*} e
	 * @returns
	 */
	const handleEnterKey = e => {
		if (e.key === 'Enter') {
			if (fieldName === '') {
				return;
			}
			handleAddField();
			setInputRef();
			UpdateProject(project, dispatch, projectIndex);
		}
	};

	// -------------------------------------------------------------------------------------//
	/**
	 * Handle what happens when the meter checkbox is clicked. Gets flipped in the reducer
	 */
	const handleMeterBoxChange = async () => {
		await dispatch({
			type: 'SET_METER_CHECKED',
			payload: { projectName, page, field, projectIndex },
		});

		UpdateProject(project, dispatch, projectIndex);
	};

	//---------------------------------------------------------------------------------------------------//
	return (
		<div className="mt-4 w-1000 flex flex-col xl:grid xl:grid-cols-12 gap-6 basis-4/6">
			{/* Field Name */}
			<div className="col-span-5 lg:col-span-7">
				<label htmlFor="" className="input-group ">
					<span className="bg-neutral-focus cursor-pointer">
						<FaGripVertical className="h-3 w-3 fill-base-100 " />
					</span>
					<input
						type="text"
						className="input w-full w-full bg-base-100 input-sm placeholder:italic placeholder:text-slate-600"
						placeholder="eg. New Trench/Bore"
						defaultValue={fieldName}
						onChange={handleEditFieldName}
						onBlur={() => UpdateProject(project, dispatch, projectIndex)}
						onKeyDown={handleEnterKey}
						ref={inputRef}
					/>
				</label>
			</div>

			{/* ---------------------------------------------- Field Amount -------------------------------------------------- */}
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

				{/* ---------------------------------------------- Add new amount button ---------------------------------------------- */}
				<button
					className={`btn btn-block btn-sm border-none flex justify-center items-center bg-base-200 rounded-lg shadow-md mt-1 hover:bg-success text-accent hover:text-base-200`}
					onClick={handeNewAmount}
					data-bs-toggle="tooltip"
					data-bs-placement="top"
					title="Add a new amount"
				>
					<FaPlus />
				</button>
			</div>

			{/* ---------------------------------------------- Page Total---------------------------------------------- */}
			<div className="col-span-2 ">
				<label htmlFor="" className="input-group cursor-pointer h-8">
					<span className="bg-neutral-focus text-base-100">=</span>
					<div className=" flex justify-center items-center rounded-r-lg h-8 w-full  bg-base-100 h-8">
						{total}
					</div>

					{/* Delete Field Button */}
					<label
						className="w-6 p-1 bg-base-200 flex justify-center items-center hover:bg-error hover:text-base-300 cursor-pointer"
						title="Delete field"
						onClick={handleDeleteField}
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
