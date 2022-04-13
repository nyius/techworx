import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProjectsContext from '../context/projects/ProjectContext';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';
import ProjectFields from '../components/projects/ProjectFields';
import { UpdateProject } from '../context/projects/ProjectsActions';

function Project() {
	const { projects, dispatch } = useContext(ProjectsContext);
	const [pageTab, setPageTab] = useState(1);
	let params = useParams();

	// Get our project from the passed in state
	const project = projects.find(el => {
		return el.id === params.id;
	});

	let { projectName } = project;

	// project index for setting our dispatch (so we know which project we are in the project context)
	const projectIndex = projects.findIndex(el => {
		return el.projectName === projectName;
	});

	// Get all of the pages
	const pages = [...project.pages];
	//get all of the fields
	const fields = [...project.pages[pageTab - 1]];

	//---------------------------------------------------------------------------------------------------//
	const handleNameChange = async e => {
		projectName = e.target.value.trim();

		await dispatch({
			type: 'SET_NAME',
			payload: { projectName, projectIndex },
		});
	};

	//---------------------------------------------------------------------------------------------------//
	const handleDatabaseUpdate = async () => {
		try {
			UpdateProject(project.id, project, dispatch);
		} catch (error) {
			console.log(error);
		}
	};

	//---------------------------------------------------------------------------------------------------//
	const handleAddField = () => {
		fields.push(['', [0]]);

		dispatch({
			type: 'ADD_FIELD',
			payload: { projectIndex, page: pageTab - 1, fields },
		});

		handleDatabaseUpdate();
	};

	//---------------------------------------------------------------------------------------------------//
	const handleAddPage = () => {
		fields.push(['', [0]]);

		dispatch({
			type: 'ADD_FIELD',
			payload: { projectIndex, page: pageTab - 1, fields },
		});

		handleDatabaseUpdate();
	};

	//---------------------------------------------------------------------------------------------------//
	return (
		<div className="h-fit mx-auto w-11/12 bg-base-100 rounded-xl p-10 shadow-xl">
			{/* Top Bar */}
			<div className="flex flex-row justify-between items-center">
				<Link to="/dashboard">
					<button className="btn btn-sm btn-accent ">
						<FaArrowLeft className="mr-2" /> Back to projects
					</button>
				</Link>
				<p className="text-xl font-bold">{projectName}</p>
				<button className="btn btn-sm btn-outline btn-error">Delete project</button>
			</div>

			{/* Project Name */}
			<div className="my-8 ">
				<label htmlFor="" className="input-group">
					<span className="bg-base-300">Project Name</span>
					<input
						type="text"
						className="input w-full max-w-xl bg-base-200 "
						placeholder="Enter a project name"
						defaultValue={projectName}
						onChange={handleNameChange}
						onBlur={handleDatabaseUpdate}
					/>
				</label>
			</div>

			{/* Project Pages Tabs */}
			<div className="tabs">
				{pages.map((page, i) => {
					return (
						<button
							className={`tab tab-lg p-2 tab-lifted hover:bg-base-300 border-none ${
								i + 1 === pageTab ? `tab-active` : ''
							}`}
							onClick={() => setPageTab(i + 1)}
							key={i}
						>
							{`PAGE ${i + 1}`}
						</button>
					);
				})}

				{/* New Page Btn */}
				<button
					className={`tab tab-lg p-2 hover:bg-success hover:text-base-300 tab-lifted border-none`}
					onClick={handleAddPage}
				>
					<FaPlus />
				</button>
			</div>

			{/* Fields */}
			<div className="h-11/12 w-full bg-base-300 rounded-xl rounded-tl-none p-4 shadow-xl">
				<div className="h-full flex relative flex-row gap-10">
					{/* Make a fields div for each page */}
					{pages.map((page, i) => {
						return (
							<div key={i} className={`h-full basis-4/6 ${i + 1 === pageTab ? '' : 'hidden'}`}>
								{/* Fields list */}
								{page.map((field, j) => {
									return (
										<ProjectFields
											key={j}
											project={project}
											page={i}
											field={j}
											itemNum={field[0]}
											projectIndex={projectIndex}
											projectName={projectName}
											handleDatabaseUpdate={handleDatabaseUpdate}
										/>
									);
								})}

								{/* Add new field button */}
								<button
									className="btn btn-block btn-sm border-none flex justify-center items-center bg-base-200 hover:bg-success hover:text-base-300 rounded-lg shadow-xl mt-3"
									onClick={handleAddField}
								>
									<FaPlus />
								</button>
							</div>
						);
					})}

					{/* Route Total */}
					<div className="flex basis-2/6 mt-4">
						<div className="w-full h-fit bg-base-100 rounded-xl">
							<div className="flex m-2">
								<div className="basis-4/6 mx-2">
									<p className=" flex text-xl underline text-center h-full justify-center items-center">
										SCOPE OF WORK
									</p>
								</div>
								<div className="basis-1/6 mx-2">
									<p className=" flex text-xl underline text-center h-full justify-center items-center">
										PAGE TOTAL
									</p>
								</div>
								<div className="basis-1/6 mx-2">
									<p className=" flex text-xl underline text-center h-full justify-center items-center">
										ROUTE TOTAL
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Project;
