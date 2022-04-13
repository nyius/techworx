import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProjectsContext from '../context/projects/ProjectContext';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';

function NewProject() {
	const params = useParams();

	const { state, dispatch } = useContext(ProjectsContext);
	console.log(state);

	return (
		<div className="mx-auto w-11/12 bg-base-100 h-5/6 rounded-xl p-10 shadow-xl">
			{/* Top Bar */}
			<div className="flex flex-row justify-between items-center">
				<Link to="/dashboard">
					<button className="btn btn-accent ">
						<FaArrowLeft className="mr-2" /> Back to projects
					</button>
				</Link>
				<p className="text-xl font-bold">{params.id}</p>
				<button className="btn btn-sm btn-outline btn-error">Delete project</button>
			</div>

			{/* Project Name */}
			<div className="my-16 ">
				<label htmlFor="" className="input-group">
					<span className="bg-base-300">Project Name</span>
					<input
						type="text"
						className="input w-full max-w-xl bg-base-200 "
						placeholder="Enter a project name"
						// onChange={e => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
					/>
				</label>
			</div>

			{/* Project Pages */}
			<div className="tabs ">
				<button className="tab tab-lg tab-lifted tab-active border-none">Page 1</button>
				<button className="tab tab-lg tab-lifted border-none">Page 2</button>
				<button className="tab tab-lg tab-lifted border-none">Page 3</button>
			</div>

			{/* Fields */}
			<div className="w-full bg-base-300 rounded-xl rounded-tl-none h-fit p-4">
				<div className="flex flex-row gap-10">
					<div>
						<div className="mt-10 grid grid-cols-12 gap-8 basis-4/6">
							{/* Field Name */}
							<div className="col-span-6">
								<label htmlFor="" className="input-group">
									<span className="bg-base-200">Field</span>
									<input
										type="text"
										className="input w-full max-w-xl bg-base-100 "
										placeholder="eg. New Trench/Bore"
										// onChange={e => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
									/>
								</label>
							</div>
							{/* Amount */}
							<div className="col-span-3">
								<label htmlFor="" className="input-group">
									<span className="bg-base-200">Amount</span>
									<input
										type="number"
										className="input w-full max-w-sm bg-base-100"
										placeholder="eg. 145"
										// onChange={e => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
									/>
								</label>
							</div>
							{/* Page Total */}
							<div className="col-span-3">
								<label htmlFor="" className="input-group">
									<span className="bg-base-200">Total</span>
									<div className=" flex justify-center items-center h-12 w-full max-w-sm bg-base-100">
										Total
									</div>
									<span className="w-6 p-1 bg-base-200 hover:bg-error hover:text-base-300 cursor-pointer">
										<ImCross />
									</span>
								</label>
							</div>
						</div>

						{/* Add new field button */}
						<button className="btn btn-block btn-sm border-none flex justify-center items-center bg-base-200 rounded-lg shadow-xl mt-3">
							<FaPlus />
						</button>
					</div>

					{/* Route Total */}
					<div className="flex basis-2/6 mt-10">
						<div className="w-full bg-base-100 rounded-xl">
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

export default NewProject;
