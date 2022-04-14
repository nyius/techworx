import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import ProjectsContext from '../context/projects/ProjectContext';
import UserProjectHero from '../components/projects/UserProjectHero';
import AllProjectsList from '../components/projects/AllProjectsList';
import FiltersContext from '../context/filters/FiltersContext';
import ProjectsSelector from '../selectors/ProjectsSelector';
import AllProjectsFilters from '../components/layout/AllProjectsFilters';
import { createNewProjectAndNavigate, UpdateProject } from '../context/projects/ProjectsActions';

function Dashboard() {
	const { projects, loading, loadProjects, dispatch: dispatchProject } = useContext(ProjectsContext);
	const { sortBy, search, dispatch: dispatchFilter } = useContext(FiltersContext);
	let navigate = useNavigate();
	let sortedProjects = [];
	let location = useLocation();
	const previousProjectPage = location.state;
	let previousProject, projectIndex;

	// If we have projects, sort them by our chosen sorting method---------------------------------------------------------------------------------------------------//
	if (projects) sortedProjects = ProjectsSelector(projects, sortBy, search);

	useEffect(() => {
		// If we came from a project, gather its info so we can set its curOpen to false---------------------------------------------------------------------------------------------//
		if (previousProjectPage) {
			previousProject = projects.find(project => {
				return project.id === previousProjectPage;
			});

			// project index for setting our dispatch (so we know which project we are in the project context)
			projectIndex = projects.findIndex(project => {
				return project.id === previousProjectPage;
			});

			previousProject.curOpen = false;
			UpdateProject(previousProject, dispatchProject, projectIndex);
		}
	}, []);

	//---------------------------------------------------------------------------------------------------//

	return (
		<div className="mx-auto w-11/12 bg-base-100 h-fit rounded-xl p-5 shadow-xl pb-10">
			<div className="mb-6">
				<label htmlFor="" className="input-group">
					<span className="bg-base-300">Search</span>
					<input
						type="text"
						className="input w-full max-w-xl bg-base-200 p-2 h-10"
						placeholder="Search projects..."
						onChange={e => dispatchFilter({ type: 'SET_SEARCH', payload: e.target.value })}
					/>
				</label>
			</div>

			{/*-------------------- Recent Projects --------------------*/}
			<p className="font-bold text-accent-content text-xl">Your Recent Projects</p>
			<div className=" my-4 flex flex-col gap-x-5 gap-y-4 flex-wrap lg:flex-row md:flex-col sm:flex-col">
				{/* New Project Btn */}
				<button
					onClick={() => createNewProjectAndNavigate(navigate, dispatchProject)}
					className="stats bg-base-200 w-full lg:w-14 shadow-md rounded-lg flex-none hover:bg-base-300 cursor-pointer flex flex-col justify-center items-center"
					data-bs-toggle="tooltip"
					data-bs-placement="top"
					title="Add a new project"
				>
					<FaPlus className="text-2xl" />
				</button>

				{/*-------------------- Generate Recent User Projects --------------------*/}
				{sortedProjects.map((project, i) => {
					if (i < 4) {
						return <UserProjectHero key={project.id} project={project} />;
					} else {
						return;
					}
				})}
			</div>
			<div className="divider"></div>

			{/*-------------------- All Projects --------------------*/}
			<div className="h-fit w-full p-auto">
				<p className="font-bold text-accent-content text-xl">All Projects</p>

				{/* -------------------- Filters --------------------*/}

				<AllProjectsFilters />

				{/*-------------------- Generate All Projects List --------------------*/}
				{sortedProjects.map((project, i) => {
					return <AllProjectsList key={project.id} project={project} />;
				})}
			</div>
		</div>
	);
}

export default Dashboard;
