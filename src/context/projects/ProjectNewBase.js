import moment from 'moment';

let user, firstName, lastName;
const createdAtDate = moment();
const localData = JSON.parse(localStorage.getItem('loggedIn'));
if (localData) {
	user = localData[1];
	firstName = user.firstName;
	lastName = user.lastName;
}

export const NewProjectBase = {
	projectName: 'UntitledProject',
	createdBy: `${firstName} ${lastName}`,
	createdDate: createdAtDate.valueOf(),
	editedBy: `${firstName} ${lastName}`,
	editedDate: createdAtDate.valueOf(),
	curOpen: false,
	pages: [[['', [0], false]]],
};

//structure like this:
//pages:
//page#:
//item num:
//items inside (name, value)
