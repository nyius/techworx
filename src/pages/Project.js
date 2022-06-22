import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ProjectsContext from '../context/projects/ProjectContext';
import AlertContext from '../context/alert/AlertContext';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';
import ProjectFields from '../components/projects/ProjectFields';
import { removeProjectAndNavigate, UpdateProject } from '../context/projects/ProjectsActions';
import _ from 'lodash';
import Spinner from '../components/assets/Spinner';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// TODO:
// Make 'accoutn setup' page private
// Collapse values?
// drag and drop fields

function Project() {
	// Context for all projects, loading, and dispatch
	const { projects, loading, dispatch } = useContext(ProjectsContext);
	// Alert context to create alerts
	const { setAlert } = useContext(AlertContext);

	// State to handle what project page the user is on
	const [pageTab, setPageTab] = useState(1);

	const { pathname } = useLocation();
	let navigate = useNavigate();
	let params = useParams();

	let project, projectName, projectIndex, pages, curPageFields;

	//If the user isn't loading the projects, grab them from the context
	if (!loading) {
		// Get our project from the passed in state
		project = projects.find(el => {
			return el.id === params.id;
		});
		projectName = project.projectName;

		// project index for setting our dispatch (so we know which project we are in the project context)
		projectIndex = projects.findIndex(el => {
			return el.projectName === projectName;
		});

		// Create deep clones of the projects pages and the projects fields
		pages = _.cloneDeep(project.pages);
		curPageFields = _.cloneDeep(project.pages[pageTab - 1]);
	}

	// useEffect to Set the project to currently open on the database ----------------------------------------------------------------------
	useEffect(() => {
		if (projects.length > 0) project.curOpen = true;
		UpdateProject(project, dispatch, projectIndex);
	}, []);

	// if the user presses the back button or closes the tab, set their project state to closed on the database (so other users can open and edit it) ----------------------------------------------------------------------
	useEffect(() => {
		window.addEventListener('unload', unloadSetOpen);
		return () => window.removeEventListener('unload', unloadSetOpen);
	});

	//---------------------------------------------------------------------------------------------------//
	/**
	 * Handles reordering the fields when dragging
	 */
	const onDragEnd = result => {
		if (!result.destination) {
			return;
		}

		if (result.destination.index === result.source.index) {
			return;
		}

		const page = result.source.droppableId;
		const moved = result.source.index;
		const movedTo = result.destination.index;

		dispatch({
			type: 'REORDER_PAGES',
			payload: { projectIndex, page, moved, movedTo },
		});

		UpdateProject(project, dispatch, projectIndex);
	};

	//---------------------------------------------------------------------------------------------------//
	/**
	 * Handles setting the current open project to false so that other users can open it/edit it
	 * @param {*} e
	 * @returns
	 */
	const unloadSetOpen = e => {
		project.curOpen = false;
		UpdateProject(project, dispatch, projectIndex);
		return;
	};

	//  ---------------------------------------------------------------------------------------------------//
	/**
	 * Handle what to do when the user changes the project name. Uses e.target.value
	 * expects an event (e)
	 * @param {*} e
	 */
	const handleNameChange = async e => {
		projectName = e.target.value.trim();

		await dispatch({
			type: 'SET_NAME',
			payload: { projectName, projectIndex },
		});
		UpdateProject(project, dispatch, projectIndex);
	};

	// ---------------------------------------------------------------------------------------------------//
	/**
	 * Handle what to do when the user adds a new field to their project (eg. New trench/bore, new vault, etc).
	 * Dispatches to the projects reducer/context.
	 * calls UpdateProject to handle updating the database
	 */
	const handleAddField = async () => {
		await dispatch({
			type: 'ADD_FIELD',
			payload: { projectIndex, pages },
		});

		UpdateProject(project, dispatch, projectIndex);
	};

	// ---------------------------------------------------------------------------------------------------//
	/**
	 * Handles what to do when the user adds a new page.
	 * Dispatches to the projects reducer/context.
	 * calls UpdateProject to handle updating the database
	 */
	const handleAddPage = async () => {
		//push a copy of page [0] to the pages array. page 0 will be our 'base' page
		const pageCopy = _.cloneDeep(pages[0]);

		// Set all of the values for each field on the new page to 0 (they shouldn't be filled in)
		pageCopy.forEach(pageField => {
			pageField[1] = [0];
		});

		// Push the new page to our pages arr
		pages.push(pageCopy);

		// dispatch the new page to projects reducer
		await dispatch({
			type: 'ADD_PAGE',
			payload: { projectIndex, pages },
		});

		UpdateProject(project, dispatch, projectIndex);
	};

	// ---------------------------------------------------------------------------------------------------//
	/**
	 * Handle deleting a certain page
	 * Dispatches to the projects reducer/context.
	 * calls UpdateProject to handle updating the database
	 *
	 * @returns
	 */
	const handleDeletePage = async () => {
		// Check if its the last page so the user doesn't delete it
		if (pages.length === 1) {
			setAlert("Can't delete last page", 'error');
			return;
		}

		// Check if they're on the first page, so that the current page 'tab' doesn't mess up and go negative
		if (pageTab === 1) {
			setPageTab(1);
		} else {
			setPageTab(pageTab - 1);
		}

		// dispatch the new page to projects reducer
		await dispatch({
			type: 'REMOVE_PAGE',
			payload: { projectIndex, page: pageTab - 1 },
		});

		UpdateProject(project, dispatch, projectIndex);
	};

	// -----------------------------------------------------------------------------------------------//
	/**
	 * What to do when deleting the whole permit.
	 * Uses removeProjectAndNavigate from ProjectActions.
	 * Navigates the user back to the dashboard after its deleted
	 */
	const handleDeletePermit = () => {
		removeProjectAndNavigate(navigate, dispatch, projectIndex, project.id);
	};

	// ---------------------------------------------------------------------------------------------------//
	/**
	 * Calculate the total Route Totals and outputs a div element to display totals.
	 * @returns
	 */
	const CalculateRouteTotals = () => {
		const routeTotals = [];

		// Loop over each page, and each field, and adds up all values
		pages.forEach((page, i) => {
			page.forEach((field, j) => {
				const pageTotal = field[1].reduce((acc, cur) => Number(acc) + Number(cur));

				// if this field exists in our array, add to it. Else, create the new field in our array to start counting on
				routeTotals[j] ? (routeTotals[j] += pageTotal) : (routeTotals[j] = pageTotal);
			});
		});

		return routeTotals.map((num, i) => {
			return (
				<p className="text-xl text-right" key={i}>
					{num}
					{pages[0][i][2] === true ? 'm' : ''}
				</p>
			);
		});
	};

	// ---------------------------------------------------------------------------------------------------//
	/**
	 * Calculate individual Page Totals and outputs a div element
	 * @returns
	 */
	const CalculatePageTotals = () => {
		return curPageFields.map((field, i) => {
			if (typeof field !== 'undefined') {
				const pageTotal = field[1].reduce((acc, cur) => acc + cur);
				return (
					<p className="text-xl text-right" key={i}>
						{pageTotal}
						{pages[0][i][2] === true ? 'm' : ''}
					</p>
				);
			}
		});
	};

	//---------------------------------------------------------------------------------------------------//
	/**
	 * Displays field names for the totals container. Loops over each field the user created.
	 * @returns
	 */
	const DisplayFieldNames = () => {
		return curPageFields.map((field, i) => {
			if (typeof field !== 'undefined') {
				return (
					<p className=" flex text-xl" key={i}>
						{field[0] ? field[0] : ''}
					</p>
				);
			}
		});
	};

	//---------------------------------------------------------------------------------------------------//
	if (!loading) {
		return (
			<div className="h-fit mx-auto w-11/12 bg-base-100 rounded-xl p-5 shadow-xl">
				{/* -------------------------------Top Bar -------------------------------*/}
				<div className="flex flex-col md:flex-row justify-between items-center">
					<button
						className="btn btn-sm btn-accent my-2 md:my-0"
						onClick={() => navigate('/dashboard', { state: pathname.replace('/project/', '') })}
					>
						<FaArrowLeft className="mr-2" /> Back to projects
					</button>
					<p className="text-xl font-bold my-2 md:my-0">{projectName}</p>

					{/* -------------------------------Delete Permit btn -------------------------------*/}
					<label className="btn btn-sm btn-outline btn-error my-2 md:my-0" htmlFor="delete-permit-modal">
						Delete permit
					</label>
				</div>

				{/* -------------------------------Project Name------------------------------- */}
				<div className="mt-8  mb-5">
					<label htmlFor="" className="input-group">
						<span>Project Name</span>
						<input
							type="text"
							className="input w-full max-w-xl bg-base-200"
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
					<div className="h-full flex relative flex-col xl:flex-row gap-10 ">
						{/* Make a curPageFields div for each page */}
						{pages.map((page, i) => {
							return (
								<DragDropContext onDragEnd={onDragEnd} key={i}>
									<Droppable droppableId={i + ''}>
										{(provided, snapshot) => (
											<div
												key={i}
												ref={provided.innerRef}
												style={{
													backgroundColor: snapshot.isDraggingOver ? '#242933' : '',
												}}
												className={`h-full basis-7/12 ${i + 1 === pageTab ? '' : 'hidden'}`}
												{...provided.droppableProps}
											>
												{/* curPageFields list */}
												{page.map((field, j) => {
													if (typeof field !== 'undefined') {
														return (
															<Draggable draggableId={j + ''} index={j} key={j}>
																{provided => (
																	<div
																		ref={provided.innerRef}
																		{...provided.draggableProps}
																		{...provided.dragHandleProps}
																	>
																		<ProjectFields
																			project={project}
																			page={i}
																			field={j}
																			itemNum={field[0]}
																			projectIndex={projectIndex}
																			projectName={projectName}
																			handleAddField={handleAddField}
																		/>
																	</div>
																)}
															</Draggable>
														);
													}
												})}

												{provided.placeholder}
											</div>
										)}
									</Droppable>
								</DragDropContext>
							);
						})}

						{/*-------------------------------SCOPE OF WORK BLOCK------------------------------- */}
						<div className="flex basis-5/12 mt-4 justify-center order-first xl:order-last">
							<div className="w-full h-fit bg-base-100 rounded-xl max-w-screen-md">
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
										<DisplayFieldNames />
									</div>
									<div className="basis-1/6 mx-1 ">
										<CalculatePageTotals />
									</div>
									<div className="basis-1/6 mx-2">
										<CalculateRouteTotals />
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* -------------------------------Add new field button -------------------------------*/}
					<p className="text-center xl:hidden">Add new field</p>
					<button
						className="btn btn-block btn-sm border-none text-accent flex hover:text-base-200 justify-center items-center bg-base-200 hover:bg-success  rounded-lg shadow-xl mt-3"
						onClick={handleAddField}
						data-bs-toggle="tooltip"
						data-bs-placement="top"
						title="Add a new field"
					>
						<FaPlus className="" />
					</button>
				</div>

				{/* ----------------------------------- Delete Page Modal----------------------------------- */}
				<input type="checkbox" id="delete-page-modal" className="modal-toggle" />
				<label htmlFor="delete-page-modal" className="modal">
					<label className="modal-box relative flex flex-col">
						<label htmlFor="delete-page-modal" className="btn btn-sm btn-circle absolute right-2 top-2">
							X
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
					</label>
				</label>
				{/* ----------------------------------- Delete permit Modal----------------------------------- */}
				<input type="checkbox" id="delete-permit-modal" className="modal-toggle" />
				<label htmlFor="delete-permit-modal" className="modal">
					<label className="modal-box relative flex flex-col">
						<label htmlFor="delete-permit-modal" className="btn btn-sm btn-circle absolute right-2 top-2">
							X
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
					</label>
				</label>
			</div>
		);
	} else {
		return <Spinner msg={`Loading project`} />;
	}
}

export default Project;
