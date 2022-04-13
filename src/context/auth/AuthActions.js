import { signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase/firebase';

export const startGoogleLogin = () => {
	return signInWithPopup(auth, googleProvider)
		.then(userCredential => {
			return userCredential.user.uid;
		})
		.catch(error => console.log(error));
};

export const startLogout = () => {
	signOut(auth)
		.then(e => {
			//
		})
		.catch(error => {
			console.log(error);
		});
};

export const startEmailRegister = ({ email, password }) => {
	return createUserWithEmailAndPassword(auth, email, password)
		.then(userCredential => {
			return userCredential;
		})
		.catch(error => {
			return error;
		});
};

export const startEmailLogin = (email, password) => {
	return signInWithEmailAndPassword(auth, email, password)
		.then(userCredential => {
			return userCredential.user.uid;
		})
		.catch(error => {
			console.log(error);
		});
};
