import React, { useContext } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import FiltersContext from '../../context/filters/FiltersContext';

function AllProjectsFilters() {
	const { sortBy, search, dispatch } = useContext(FiltersContext);

	const handleSortClick = props => {
		switch (props) {
			case 'projectName':
				return dispatch({ type: 'SET_SORTBY', payload: sortBy === "ProjectNameUp" ? 'ProjectNameDown' : "ProjectNameUp" }) //prettier-ignore
			case 'createdDate':
				return dispatch({ type: 'SET_SORTBY', payload: sortBy === "DateCreatedUp" ? 'DateCreatedDown' : "DateCreatedUp" }) //prettier-ignore
			case 'createdBy':
				return dispatch({ type: 'SET_SORTBY', payload: sortBy === "CreatedByUp" ? 'CreatedByDown' : "CreatedByUp" }) //prettier-ignore
			case 'editedBy':
				return dispatch({ type: 'SET_SORTBY', payload: sortBy === "EditedByUp" ? 'EditedByDown' : "EditedByUp" }) //prettier-ignore
			case 'editedDate':
				return dispatch({ type: 'SET_SORTBY', payload: sortBy === "EditedDateUp" ? 'EditedDateDown' : "EditedDateUp" }) //prettier-ignore
		}
	};

	return (
		<div className="mt-3 grid grid-cols-1 lg:grid-cols-6 bg-base-200 rounded-lg mb-3">
			<div
				className="flex hover:bg-base-300 p-2 rounded-lg cursor-pointer items-center"
				onClick={() => handleSortClick(`projectName`)}
			>
				<p className="mr-2">|</p>
				<p className="text-accent-content text-xl">Project Name</p>
				{sortBy === 'ProjectNameUp' ? <FaArrowUp className="text-xl pl-2" /> : ''}
				{sortBy === 'ProjectNameDown' ? <FaArrowDown className="text-xl pl-2" /> : ''}
			</div>
			<div
				className="flex hover:bg-base-300 p-2 rounded-lg cursor-pointer items-center hidden lg:flex"
				onClick={() => handleSortClick(`createdDate`)}
			>
				<p className="mr-2">|</p>
				<p className="text-accent-content text-xl">Date Created</p>
				{sortBy === 'DateCreatedUp' ? <FaArrowUp className="text-xl pl-2" /> : ''}
				{sortBy === 'DateCreatedDown' ? <FaArrowDown className="text-xl pl-2" /> : ''}
			</div>
			<div
				className="flex hover:bg-base-300 p-2 rounded-lg cursor-pointer items-center hidden lg:flex"
				onClick={() => handleSortClick(`createdBy`)}
			>
				<p className="mr-2">|</p>
				<p className="text-accent-content text-xl">Created By</p>
				{sortBy === 'CreatedByUp' ? <FaArrowUp className="text-xl pl-2" /> : ''}
				{sortBy === 'CreatedByDown' ? <FaArrowDown className="text-xl pl-2" /> : ''}
			</div>
			<div
				className="flex hover:bg-base-300 p-2 rounded-lg cursor-pointer items-center hidden lg:flex"
				onClick={() => handleSortClick(`editedDate`)}
			>
				<p className="mr-2">|</p>
				<p className="text-accent-content text-xl">Date Edited</p>
				{sortBy === 'EditedDateUp' ? <FaArrowUp className="text-xl pl-2" /> : ''}
				{sortBy === 'EditedDateDown' ? <FaArrowDown className="text-xl pl-2" /> : ''}
			</div>
			<div
				className="flex hover:bg-base-300 p-2 rounded-lg cursor-pointer items-center hidden lg:flex"
				onClick={() => handleSortClick(`editedBy`)}
			>
				<p className="mr-2">|</p>
				<p className="text-accent-content text-xl">Edited By</p>
				{sortBy === 'EditedByUp' ? <FaArrowUp className="text-xl pl-2" /> : ''}
				{sortBy === 'EditedByDown' ? <FaArrowDown className="text-xl pl-2" /> : ''}
			</div>
		</div>
	);
}

export default AllProjectsFilters;
