import React, { useContext, useState, useEffect } from 'react'
import 'firebase/firestore'
import firebase from 'firebase/app';
import { db } from '../firebase'
import { useAuth } from './AuthContext'
import { auth } from '../firebase'

const UserContext = React.createContext()

export function useUser () {
  return useContext(UserContext)
}

export function UserProvider ({ children }) {
	const [dbUser, setDbUser] = useState('');
	const isLoggedIn = auth.currentUser;
	const [levels, setLevels] = useState({})

	useEffect(() => {
		const fetchData = async () => {
			if (isLoggedIn) {
				const userRef = db.collection('Users').doc(isLoggedIn.uid);
				(() => {
					userRef.get().then((user) => {
						setDbUser(user.data());
					});
				})();
			} else {
				setDbUser(null);
			}
		};
		return fetchData;
	}, []);

	function getDbUser() {
		if (isLoggedIn) {
			return db
				.collection('Users')
				.doc(isLoggedIn.uid)
				.get()
				.then((user) => {
					setDbUser(user.data());
				});
		}
	}

	function getLevels() {
		const sectionsRef = db.collection('Sections');
    const getLevels = {};
		sectionsRef.get().then((snapshot) => {
			snapshot.docs.forEach((doc) => {
        // console.log(doc.data());
        const section = doc.data()
        getLevels[section.name] = section.levels
      });
      setLevels(getLevels)
		});
  }

  // function getUserProgress () {
  //   const userRef = db.collection('Users');
  //   const userProgress = {}
  //   userRef.where(firebase.firestore.FieldPath.documentId(), '==', isLoggedIn.uid).get().then((snapshot) => {
  //     snapshot.docs.forEach((doc) => {
  //       console.log(doc.data())
  //     })
  //   })
  //   console.log('dbuser', dbUser)
  // }

	// console.log('user context', dbUser)
	const value = {
		dbUser,
		getDbUser,
    setDbUser,
    getLevels,
    levels,
    // getUserProgress
	};
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
