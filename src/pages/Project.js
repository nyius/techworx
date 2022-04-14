import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ProjectsContext from '../context/projects/ProjectContext';
import AlertContext from '../context/alert/AlertContext';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';
import ProjectFields from '../components/projects/ProjectFields';
import { removeProjectAndNavigate, UpdateProject } from '../context/projects/ProjectsActions';
import _ from 'lodash';

function Project() {
	const { projects, dispatch } = useContext(ProjectsContext);
	const { setAlert } = useContext(AlertContext);
	const [pageTab, setPageTab] = useState(1);
	let params = useParams();
	const { pathname } = useLocation();
	let navigate = useNavigate();

	// Get our project from the passed in state
	const project = projects.find(el => {
		return el.id === params.id;
	});

	useEffect(() => {
		project.curOpen = true;
	}, []);

	let { projectName } = project;

	// project index for setting our dispatch (so we know which project we are in the project context)
	const projectIndex = projects.findIndex(el => {
		return el.projectName === projectName;
	});

	// Get all of the pages & curPageFields
	const pages = _.cloneDeep(project.pages);
	const curPageFields = _.cloneDeep(project.pages[pageTab - 1]);

	// Handle what to do when the user changes the project name ---------------------------------------------------------------------------------------------------//
	const handleNameChange = async e => {
		projectName = e.target.value.trim();

		await dispatch({
			type: 'SET_NAME',
			payload: { projectName, projectIndex },
		});

		UpdateProject(project, dispatch, projectIndex);
	};

	// Handle what to do when the user adds a new field ---------------------------------------------------------------------------------------------------//
	const handleAddField = async () => {
		await dispatch({
			type: 'ADD_FIELD',
			payload: { projectIndex, pages },
		});

		UpdateProject(project, dispatch, projectIndex);
	};

	// Handle what to do when the user adds a new page ---------------------------------------------------------------------------------------------------//
	const handleAddPage = async () => {
		//push a copy of page [0] to the pages array. page 0 will be our 'base' page
		const pageCopy = _.cloneDeep(pages[0]);
		pages.push(pageCopy);

		await dispatch({
			type: 'ADD_PAGE',
			payload: { projectIndex, pages },
		});

		UpdateProject(project, dispatch, projectIndex);
	};

	// handle deleting a certain page ---------------------------------------------------------------------------------------------------//
	const handleDeletePage = async () => {
		if (pages.length === 1) {
			setAlert("Can't delete last page", 'error');
			return;
		}
		setPageTab(pageTab - 1);
		await dispatch({
			type: 'REMOVE_PAGE',
			payload: { projectIndex, page: pageTab - 1 },
		});

		UpdateProject(project, dispatch, projectIndex);
	};

	// What to do when deleting the whole permit -----------------------------------------------------------------------------------------------//
	const handleDeletePermit = () => {
		removeProjectAndNavigate(navigate, dispatch, projectIndex, project.id);
	};

	//---------------------------------------------------------------------------------------------------//
	return (
		<div className="h-fit mx-auto w-11/12 bg-base-100 rounded-xl p-5 shadow-xl">
			{/* -------------------------------Top Bar -------------------------------*/}
			<div className="flex flex-row justify-between items-center">
				<button
					className="btn btn-sm btn-accent "
					onClick={() => navigate('/dashboard', { state: pathname.replace('/project/', '') })}
				>
					<FaArrowLeft className="mr-2" /> Back to projects
				</button>
				<p className="text-xl font-bold">{projectName}</p>

				{/* -------------------------------Delete Permit btn -------------------------------*/}
				<label className="btn btn-sm btn-outline btn-error" htmlFor="delete-permit-modal">
					Delete permit
				</label>
			</div>

			{/* -------------------------------Project Name------------------------------- */}
			<div className="mt-8  mb-5">
				<label htmlFor="" className="input-group">
					<span className="bg-neutral-focus">Project Name</span>
					<input
						type="text"
						className="input w-full max-w-xl bg-base-200 "
						placeholder="Enter a project name"
						defaultValue={projectName}
						onChange={handleNameChange}
						onBlur={() => UpdateProject(project, dispatch, projectIndex)}
					/>
				</label>
			</div>

			{/* -------------------------------Project Pages Tabs------------------------------- */}
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

				{/* -------------------------------New Page Btn------------------------------- */}
				<button
					className={`tab tab-lg p-2 hover:bg-success hover:text-base-300 tab-lifted border-none`}
					onClick={handleAddPage}
				>
					<FaPlus />
				</button>
			</div>

			<div className="h-11/12 w-full bg-base-300 rounded-xl rounded-tl-none p-4 shadow-xl">
				{/*------------------------------- Delete Page Btn------------------------------- */}
				<div className="flex place-content-end">
					<label className="btn btn-error btn-sm btn-outline" htmlFor="delete-page-modal">
						DELETE PAGE
					</label>
				</div>

				{/* ------------------------------- Current Page fields -------------------------------*/}
				<div className="h-full flex relative flex-row gap-10">
					{/* Make a curPageFields div for each page */}
					{pages.map((page, i) => {
						return (
							<div key={i} className={`h-full basis-7/12 ${i + 1 === pageTab ? '' : 'hidden'}`}>
								{/* curPageFields list */}
								{page.map((field, j) => {
									if (typeof field !== 'undefined') {
										return (
											<ProjectFields
												key={j}
												project={project}
												page={i}
												field={j}
												itemNum={field[0]}
												projectIndex={projectIndex}
												projectName={projectName}
												handleAddField={handleAddField}
											/>
										);
									}
								})}

								{/* -------------------------------Add new field button -------------------------------*/}
								<button
									className="btn btn-block btn-sm border-none flex justify-center items-center bg-base-200 hover:bg-success hover:text-base-300 rounded-lg shadow-xl mt-3"
									onClick={handleAddField}
								>
									<FaPlus />
								</button>
							</div>
						);
					})}

					{/*------------------------------- Route Total------------------------------- */}
					<div className="flex basis-5/12 mt-4">
						<div className="w-full h-fit bg-base-100 rounded-xl">
							<div className="flex m-2 p-2">
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
							<div className="flex m-1 p-2">
								<div className="basis-4/6 mx-2">
									{curPageFields.map((field, i) => {
										if (typeof field !== 'undefined') {
											return (
												<p className=" flex text-xl" key={i}>
													{field[0] ? field[0] : ''}
												</p>
											);
										}
									})}
								</div>
								<div className="basis-1/6 mx-1 ">
									{curPageFields.map((field, i) => {
										if (typeof field !== 'undefined') {
											const pageTotal = field[1].reduce((acc, cur) => acc + cur);
											return (
												<p className="text-xl text-right" key={i}>
													{pageTotal === 0 ? '' : pageTotal}
												</p>
											);
										}
									})}
								</div>
								<div className="basis-1/6 mx-2">
									<p className=" text-right text-xl justify-center">400m</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* ----------------------------------- Delete Page Modal----------------------------------- */}
			<input type="checkbox" id="delete-page-modal" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box relative flex flex-col">
					<label htmlFor="delete-page-modal" className="btn btn-sm btn-circle absolute right-2 top-2">
						{' '}
						X{' '}
					</label>
					<p className="text-lg text-accent-content mt-5">Are you sure you want to delete this page?</p>
					<label htmlFor="delete-page-modal" className="btn btn-sm btn-accent my-5">
						CANCEL
					</label>

					<label
						htmlFor="delete-page-modal"
						className="btn btn-sm btn-outline btn-error "
						onClick={handleDeletePage}
					>
						DELETE
					</label>
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

export default Project;
