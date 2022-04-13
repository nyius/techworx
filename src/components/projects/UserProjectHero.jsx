import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function UserProjectHero({ project }) {
	const { createdBy, createdDate, editedBy, editedDate, projectName, id } = project;
	const navigate = useNavigate();
	const [focus, setFocus] = useState(false);

	return (
		<Link to={`/project/${id}`}>
			<div
				className="rounded-lg shadow-md flex-1 w-95 bg-base-200 p-3 justify-start hover:bg-base-300 cursor-pointer overflow-hidden ..."
				onMouseEnter={() => setFocus(true)}
				onMouseLeave={() => setFocus(false)}
			>
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
					<div className="mt-3 flex gap-x-3">
						{focus && (
							<>
								<button
									className="btn btn-sm btn-accent"
									onClick={() => navigate(`/project/${projectName}`)}
								>
									Edit
								</button>
								<button className="btn btn-sm btn-outline btn-error">Delete</button>
							</>
						)}
					</div>
				</div>
			</div>
		</Link>
	);
}

export default UserProjectHero;
