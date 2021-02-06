import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
import "firebase/firestore";
import firebase from "firebase/app";
import { useUser } from "./UserContext";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
	const { setDbUser } = useUser();

	const history = useHistory();

	function signin(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	function signout() {
		setDbUser(null);
		history.push("/");
		return auth.signOut();
	}

	function signup(email, password, firstName, lastName) {
		return auth
			.createUserWithEmailAndPassword(email, password)
			.then(() => {
				firebase
					.firestore()
					.collection("Users")
					.doc(firebase.auth().currentUser.uid)
					.set({
						firstName: firstName,
						lastName: lastName,
						points: 0,
						progress: {
							'ABCD': {
								easy: false,
								medium: false,
								hard: false,
							},
							'EFGH': {
								easy: false,
								medium: false,
								hard: false,
							},
							'IJKL': {
								easy: false,
								medium: false,
								hard: false,
							},
							'MNOP': {
								easy: false,
								medium: false,
								hard: false,
							},
							'QRST': {
								easy: false,
								medium: false,
								hard: false,
							},
							'UVW': {
								easy: false,
								medium: false,
								hard: false,
							},
							'XYZ': {
								easy: false,
								medium: false,
								hard: false,
							},
						}
					})
					.catch((error) => {
						console.log(
							"Something went wrong with adding user to firestore:",
							error
						);
					});
			})
			.catch((error) => {
				console.log("Something went wrong with sign up:", error);
			});
	}

	function updateUser(firstName, lastName) {
		return firebase
			.firestore()
			.collection("Users")
			.doc(currentUser.uid)
			.update({
				firstName: firstName,
				lastName: lastName,
			});
	}

	function updateEmail(email) {
		return currentUser.updateEmail(email);
	}

	function updatePassword(password) {
		return currentUser.updatePassword(password);
	}

	function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		signup,
		signin,
		signout,
		updateEmail,
    updatePassword,
    resetPassword,
    updateUser,
	};
	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
