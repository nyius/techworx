import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaFile } from 'react-icons/fa';
import moment from 'moment';

function AllProjectsList({ project }) {
	const { createdBy, createdDate, editedBy, editedDate, projectName, id } = project;
	let navigate = useNavigate();

	return (
		<div
			className="grid grid-cols-6 rounded-lg hover:bg-base-200 "
			data-bs-toggle="tooltip"
			data-bs-placement="top"
			title={projectName}
			onClick={() => navigate(`/project/${id}`)}
		>
			<div className="flex cursor-pointer p-1 pr-10 rounded-lg gap-x-2 items-center">
				<FaFile />
				<p className="truncate ...">{projectName}</p>
			</div>
			<div className="flex cursor-pointer p-1 pr-10 rounded-lg gap-x-2 items-center">
				<p>{moment(createdDate).format('M/D/Y, h:mm a')}</p>
			</div>
			<div className="flex cursor-pointer p-1 pr-10 rounded-lg gap-x-2 items-center">
				<p>{createdBy}</p>
			</div>
			<div className="flex cursor-pointer p-1 pr-10 rounded-lg gap-x-2 items-center">
				<p>{moment(editedDate).format('M/D/Y, h:mm a')}</p>
			</div>
			<div className="flex cursor-pointer p-1 pr-10 rounded-lg gap-x-2 items-center">
				<p>{editedBy}</p>
			</div>
		</div>
	);
}

export default AllProjectsList;
