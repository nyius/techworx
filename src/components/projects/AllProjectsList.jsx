import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFile } from 'react-icons/fa';
import moment from 'moment';
import AlertContext from '../../context/alert/AlertContext';

/**
 * Handles displaying a project on the dashboard list.
 * @param {*} param0
 * @returns Styled JSX to go in the dashboard list.
 */
function AllProjectsList({ project }) {
	// Context for creating alerts
	const { setAlert } = useContext(AlertContext);

	// Pull vars from the current project
	const { createdBy, curOpen, createdDate, editedBy, editedDate, projectName, id } = project;

	let navigate = useNavigate();

	return (
		<div
			className={`my-2 lg:my-0 grid grid-cols-1 text-accent-content lg:grid-cols-6 rounded-lg hover:bg-base-200 ${
				curOpen
					? 'bg-error text-base-300 lg:bg-base-100 lg:text-accent-content hover:bg-warning hover:text-accent-content'
					: ''
			}`}
			data-bs-toggle="tooltip"
			data-bs-placement="top"
			title={projectName}
			onClick={() => {
				if (curOpen) {
					setAlert('Project already open!', 'error');
					return;
				} else {
					navigate(`/project/${id}`);
				}
			}}
		>
			<div className={`flex cursor-pointer p-1 pr-10 rounded-lg gap-x-2 items-center`}>
				<FaFile />
				<p className="truncate ...">{projectName}</p>
			</div>
			<div className="flex cursor-pointer p-1 pr-10 rounded-lg gap-x-2 items-center hidden lg:block">
				<p>{moment(createdDate).format('M/D/Y, h:mm a')}</p>
			</div>
			<div className="flex cursor-pointer p-1 pr-10 rounded-lg gap-x-2 items-center hidden lg:block">
				<p>{createdBy}</p>
			</div>
			<div className="flex cursor-pointer p-1 pr-10 rounded-lg gap-x-2 items-center hidden lg:block">
				<p>{moment(editedDate).format('M/D/Y, h:mm a')}</p>
			</div>
			<div className="flex cursor-pointer p-1 pr-10 rounded-lg gap-x-2 items-center hidden lg:block">
				<p>{editedBy}</p>
			</div>
			<div className="flex cursor-pointer p-1 pr-10 rounded-lg gap-x-2 items-center hidden lg:block">
				{curOpen && <p className=" bg-error rounded-md text-error-content text-center px-2">Currently Open</p>}
			</div>
		</div>
	);
}

export default AllProjectsList;
