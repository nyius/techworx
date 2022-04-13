import PropTypes from 'prop-types';

// Takes in an array of projects, a sort by contition, and search query
// Filters any projects for ones that match a search,
// then Sorts them depending on selected sort option
const ProjectsSelector = (projects, sortBy, search) => {
	return projects
		.filter(project => {
			const textMatch = search.length === 0 || project.projectName.toLowerCase().includes(search.toLowerCase());

			return textMatch;
		})
		.sort((a, b) => {
			if (sortBy === 'ProjectNameUp') {
				return a.projectName < b.projectName ? -1 : 1;
			} else if (sortBy === 'ProjectNameDown') {
				return a.projectName < b.projectName ? 1 : -1;
			} else if (sortBy === 'CreatedByUp') {
				return a.createdBy < b.createdBy ? -1 : 1;
			} else if (sortBy === 'CreatedByDown') {
				return a.createdBy < b.createdBy ? 1 : -1;
			} else if (sortBy === 'DateCreatedUp') {
				return a.dateCreated < b.dateCreated ? -1 : 1;
			} else if (sortBy === 'DateCreatedDown') {
				return a.dateCreated < b.dateCreated ? 1 : -1;
			} else if (sortBy === 'EditedByUp') {
				return a.editedBy < b.editedBy ? -1 : 1;
			} else if (sortBy === 'EditedByDown') {
				return a.editedBy < b.editedBy ? 1 : -1;
			} else if (sortBy === 'EditedDateUp') {
				return a.editedDate < b.editedDate ? -1 : 1;
			} else if (sortBy === 'EditedDateDown') {
				return a.editedDate < b.editedDate ? 1 : -1;
			}
		});
};

ProjectsSelector.propTypes = {
	projects: PropTypes.array.isRequired,
	sortBy: PropTypes.array.isRequired,
	search: PropTypes.string,
};

export default ProjectsSelector;
