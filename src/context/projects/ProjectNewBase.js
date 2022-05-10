import moment from 'moment';

const createdAtDate = moment();

// For creating a new project.
export const NewProjectBase = {
	projectName: 'UntitledProject',
	createdBy: `Anon`,
	createdDate: createdAtDate.valueOf(),
	editedBy: `Anon`,
	editedDate: createdAtDate.valueOf(),
	curOpen: false,
	pages: [[['', [0], false]]],
};

//structure like this:
//pages:
//page#:
//item num:
//items inside (name, value)
