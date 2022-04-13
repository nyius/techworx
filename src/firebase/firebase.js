import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, set } from 'firebase/database';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import moment from 'moment';

const createdAtDate = moment();
const firebaseConfig = {
	apiKey: 'AIzaSyBgfb8SlIy4tLz581v_LoS5P-bH7fF7Ftg',
	authDomain: 'techworx-4f37a.firebaseapp.com',
	databaseURL: 'https://techworx-4f37a-default-rtdb.firebaseio.com',
	projectId: 'techworx-4f37a',
	storageBucket: 'techworx-4f37a.appspot.com',
	messagingSenderId: '794309446331',
	appId: '1:794309446331:web:dd4c89bc7263484877379e',
};

initializeApp(firebaseConfig);

export const database = getDatabase();
export const auth = getAuth();

// Google auth -------------------------------------------------------
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
	prompt: 'select_account',
});

// Email auth ---------------------------------------------------------------------------------------------------//

// const databaseProjRef = ref(database, 'projects');
// push(databaseProjRef, {
// 	projectName: 'UntitledProject',
// 	createdBy: 'New Project',
// 	createdDate: createdAtDate.valueOf(),
// 	editedBy: 'New Project',
// 	editedDate: '01/01/2022 00:00 AM',
// 	curOpen: false,
// 	pages: [
// 		[
// 			['Soup', [20, 35, 1, 33, 143]],
// 			['wontons', [2, 1, 4, 3, 2]],
// 		],
// 		[['pickles', [1, 2]]],
// 		[['', [0]]],
// 	],
// });
