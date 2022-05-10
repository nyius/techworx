import { signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { database } from '../../firebase/firebase';
import { ref, get, set } from 'firebase/database';
import { auth, googleProvider } from '../../firebase/firebase';

// ---------------------------------------------------------------------------------------------------//
/**
 * Handles logging out.
 */
export const startLogout = () => {
	signOut(auth)
		.then(e => {
			//
		})
		.catch(error => {
			console.log(error);
		});
};

// ---------------------------------------------------------------------------------------------------//
/**
 * Handle registering with email.
 * Expects "email" and "password" parameters to be passed in.
 * @param {*} param0
 * @returns
 */
export const startEmailRegister = ({ email, password }) => {
	return createUserWithEmailAndPassword(auth, email, password)
		.then(userCredential => {
			return userCredential;
		})
		.catch(error => {
			return error;
		});
};

// ---------------------------------------------------------------------------------------------------//
/**
 * Handles logging in with email.
 * Expects "email" and "password" parameters to be passed in.
 * @param {*} email
 * @param {*} password
 * @returns logged in users UID
 */
export const startEmailLogin = (email, password) => {
	return signInWithEmailAndPassword(auth, email, password)
		.then(userCredential => {
			return userCredential.user.uid;
		})
		.catch(error => {
			console.log(error);
			return error;
		});
};

// ---------------------------------------------------------------------------------------------------//
/**
 * Handle logging in with google.
 * @returns logged in users UID
 */
export const startGoogleLogin = () => {
	return signInWithPopup(auth, googleProvider)
		.then(userCredential => {
			return userCredential.user.uid;
		})
		.catch(error => console.log(error));
};

// ---------------------------------------------------------------------------------------------------//
/**
 * Handles saving current logged in user in localStorage.
 * Sets the current user as logged in in their local storage.
 * Dispatches to auth reducer.
 * Expects UID, a user, and a dispatch method (from our auth context)
 * @param {*} uid
 * @param {*} user
 * @param {*} dispatch
 */
export const dispatchStartLogin = (uid, user, dispatch) => {
	new Promise((resolve, reject) => {
		const localUser = JSON.stringify([uid, user]);

		localStorage.setItem('loggedIn', localUser);

		dispatch({
			type: 'LOGIN',
			payload: { uid, user },
		});
		resolve();
	});
};

// ---------------------------------------------------------------------------------------------------//
/**
 * Handles logging in the user on our database.
 * Looks for our user from the database.
 * expects a uid
 * @param {string} uid
 * @returns logged in user
 */
export const startLogin = uid => {
	const databaseUserRef = ref(database, `users/${uid}`);

	return get(databaseUserRef)
		.then(snapshot => {
			if (snapshot.exists()) {
				return snapshot.val();
			}
		})
		.catch(error => {
			console.log(error);
			return error;
		});
};

// ---------------------------------------------------------------------------------------------------//
/**
 * handles Creating a new user in the database.
 * Expects a uid, their firstname, and lastName
 * @param {string} uid
 * @param {string} firstName
 * @param {string} lastName
 * @returns Error is something went wrong
 */
export const setUserAccount = async (uid, firstName, lastName) => {
	try {
		const databaseUserRef = ref(database, `users/${uid}`);

		set(databaseUserRef, {
			firstName: firstName,
			lastName: lastName,
		});
	} catch (error) {
		console.log(error);
		return error;
	}
};
