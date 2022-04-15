import { signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { database } from '../../firebase/firebase';
import { ref, update, remove, get, child, set, push, onValue } from 'firebase/database';
import { auth, googleProvider } from '../../firebase/firebase';

// Handle logging out ---------------------------------------------------------------------------------------------------//
export const startLogout = () => {
	signOut(auth)
		.then(e => {
			//
		})
		.catch(error => {
			console.log(error);
		});
};

// Handle registering with email ---------------------------------------------------------------------------------------------------//
export const startEmailRegister = ({ email, password }) => {
	return createUserWithEmailAndPassword(auth, email, password)
		.then(userCredential => {
			return userCredential;
		})
		.catch(error => {
			return error;
		});
};

// Handle logging in with email ---------------------------------------------------------------------------------------------------//
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

// Handle logging in with google ---------------------------------------------------------------------------------------------------//
export const startGoogleLogin = () => {
	return signInWithPopup(auth, googleProvider)
		.then(userCredential => {
			return userCredential.user.uid;
		})
		.catch(error => console.log(error));
};

// Sets the context with info ---------------------------------------------------------------------------------------------------//
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

// looks for our user from the database ---------------------------------------------------------------------------------------------------//
export const startLogin = (uid, dispatch) => {
	const databaseUserRef = ref(database, `users/${uid}`);

	return get(databaseUserRef)
		.then(snapshot => {
			if (snapshot.exists()) {
				// dispatchStartLogin(uid, dispatch);

				return snapshot.val();
			}
		})
		.catch(error => {
			console.log(error);
			return error;
		});
};

// Creates a new user in the database ---------------------------------------------------------------------------------------------------//
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
