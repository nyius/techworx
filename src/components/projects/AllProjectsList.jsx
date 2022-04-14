import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFile } from 'react-icons/fa';
import moment from 'moment';
import AlertContext from '../../context/alert/AlertContext';

function AllProjectsList({ project }) {
	const { setAlert } = useContext(AlertContext);

	const { createdBy, curOpen, createdDate, editedBy, editedDate, projectName, id } = project;
	let navigate = useNavigate();

	return (
		<div
			className={`grid grid-cols-1 lg:grid-cols-6 rounded-lg hover:bg-base-200 ${
				curOpen
					? 'bg-error text-error-content lg:bg-base-100 lg:text-accent-content hover:bg-error-content hover:text-accent-content'
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
				{curOpen && (
					<p className=" bg-error rounded-md text-error-content font-bold text-center px-2">Currently Open</p>
				)}
			</div>
		</div>
	);
}

export default AllProjectsList;
