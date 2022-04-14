import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProjectsContext from '../../context/projects/ProjectContext';
import { removeProjectAndNavigate } from '../../context/projects/ProjectsActions';

function UserProjectHero({ project }) {
	const { createdBy, createdDate, editedBy, editedDate, projectName, id } = project;
	const { projects, dispatch } = useContext(ProjectsContext);

	const navigate = useNavigate();

	// project index for setting our dispatch (so we know which project we are in the project context)
	const projectIndex = projects.findIndex(el => {
		return el.projectName === projectName;
	});

	//---------------------------------------------------------------------------------------------------//
	const handleDeletePermit = () => {
		removeProjectAndNavigate(navigate, dispatch, projectIndex, project.id);
	};

	return (
		<div>
			<div className="rounded-lg shadow-md smoothExpansionParent flex-1 w-95 bg-base-200 p-3 justify-start hover:bg-base-300 cursor-pointer overflow-hidden ...">
				<div className="flex flex-col w-full">
					<p
						className="font-semibold text-accent-content mb-1 text-lg truncate ..."
						data-bs-toggle="tooltip"
						data-bs-placement="top"
						title={projectName}
					>
						{projectName}
					</p>
					<p className="italic text-base-content text-sm">Last edited on {editedDate}</p>
					<p className="italic text-base-content text-sm">By {editedBy}</p>
					<div className="mt-3 smoothExpansionContent flex gap-x-3">
						<button className="btn btn-sm btn-accent" onClick={() => navigate(`/project/${id}`)}>
							Edit
						</button>
						<label className="btn btn-sm btn-outline btn-error" htmlFor="delete-permit-modal">
							Delete
						</label>
					</div>
				</div>
			</div>
			{/* ----------------------------------- Delete permit Modal----------------------------------- */}
			<input type="checkbox" id="delete-permit-modal" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box relative flex flex-col">
					<label htmlFor="delete-permit-modal" className="btn btn-sm btn-circle absolute right-2 top-2">
						{' '}
						X{' '}
					</label>
					<p className="text-lg text-accent-content mt-5">
						Are you sure you want to delete this permit? Theres no going back!
					</p>
					<label htmlFor="delete-permit-modal" className="btn btn-sm btn-accent my-5">
						CANCEL
					</label>

					<label
						htmlFor="delete-permit-modal"
						className="btn btn-sm btn-outline btn-error "
						onClick={handleDeletePermit}
					>
						DELETE
					</label>
				</div>
			</div>
		</div>
	);
}

export default UserProjectHero;
