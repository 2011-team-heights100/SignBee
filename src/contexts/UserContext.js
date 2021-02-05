import React, { useContext, useState, useEffect } from 'react'
import 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from './AuthContext'
import { auth } from '../firebase'

const UserContext = React.createContext()

export function useUser () {
  return useContext(UserContext)
}

export function UserProvider ({ children }) {
  const [dbUser, setDbUser] = useState('');
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  const isLoggedIn = auth.currentUser

  useEffect(() => {
    const fetchData = async () => {
      if (isLoggedIn) {
        const userRef = db.collection("Users").doc(isLoggedIn.uid);
				(() => {
					userRef.get().then((user) => {
						setDbUser(user.data());
					});
				})();
      } else {
        setDbUser(null)
      }
		}
    return fetchData
  }, [])

  function getDbUser () {
    if (isLoggedIn) {
      return db.collection('Users').doc(isLoggedIn.uid).get().then((user) => {
        setDbUser(user.data())
      })

    }
  }

  // console.log('user context', dbUser)
  const value = {
    dbUser,
    getDbUser,
    setDbUser
  }
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}
