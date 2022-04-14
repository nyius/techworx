import moment from 'moment';

const createdAtDate = moment();

// export const NewProjectBase = {
// 	projectName: 'UntitledProject',
// 	createdBy: 'New Project',
// 	createdDate: createdAtDate.valueOf(),
// 	editedBy: 'New Project',
// 	editedDate: '01/01/2022 00:00 AM',
// 	curOpen: false,
// 	pages: {
// 		page_1: {
// 			fields: {
// 				item_1: {
// 					name: '',
// 					values: [0],
// 				},
// 			},
// 		},
// 	},
// };

export const NewProjectBase = {
	projectName: 'UntitledProject',
	createdBy: 'New Project',
	createdDate: createdAtDate.valueOf(),
	editedBy: 'New Project',
	editedDate: '01/01/2022 00:00 AM',
	curOpen: false,
	pages: [[['', [0], false]]],
};

//structure like this:
//pages:
//page#:
//item num:
//items inside (name, value)
