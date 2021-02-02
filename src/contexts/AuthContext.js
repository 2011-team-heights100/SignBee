import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import 'firebase/firestore';
// import app from '../firebase';
import firebase from 'firebase/app';
import { db } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

	function signin(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	function signout() {
		return auth.signOut();
	}

  function signup (email, password, firstName, lastName) {
		return auth
			.createUserWithEmailAndPassword(email, password)
			.then(() => {
				firebase
					.firestore()
					.collection('Users')
					.doc(firebase.auth().currentUser.uid)
					.set({
						firstName: firstName,
						lastName: lastName,
						points: 0,
					})
					.catch((error) => {
						console.log(
							'Something went wrong with adding user to firestore:',
							error
						);
					});
			})
			.catch((error) => {
				console.log('Something went wrong with sign up:', error);
			});
	}

	function updateUser(firstName, lastName) {
		return firebase
			.firestore()
			.collection('Users')
			.doc(currentUser.uid)
			.update({
				firstName: firstName,
				lastName: lastName,
			});
	}

  function updateEmail (email) {
		return currentUser.updateEmail(email);
	}

	function updatePassword(password) {
		return currentUser.updatePassword(password);
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
			setLoading(false);
    });
		return unsubscribe;
  }, []);

  useEffect(() => {
    if (currentUser) {
      let userDb;
      const userRef = db.collection('Users').doc(currentUser.uid);
      (async () => {
        userDb = await userRef.get();
        setDbUser(userDb.data());
      })();
    }
    return
  }, [currentUser])

	const value = {
		currentUser,
		signup,
		signin,
		signout,
		updateEmail,
		updatePassword,
    updateUser,
    dbUser
	};
  return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
