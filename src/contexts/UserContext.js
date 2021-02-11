import React, { useContext, useState, useEffect } from "react";
import "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";

const UserContext = React.createContext();

export function useUser() {
	return useContext(UserContext);
}

export function UserProvider({ children }) {
	const [dbUser, setDbUser] = useState("");
	const isLoggedIn = auth.currentUser;
	const [levels, setLevels] = useState({});
	const [currentLevel, setCurrentLevel] = useState({});
	const [difficulty, setDifficulty] = useState(null);
	// const [points, setPoints] = useState({})

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
				setDbUser(null);
			}
		};
		return fetchData;
	}, []);

	function getDbUser() {
		if (isLoggedIn) {
			return db
				.collection("Users")
				.doc(isLoggedIn.uid)
				.get()
				.then((user) => {
					setDbUser(user.data());
				});
		}
	}

	function getLevels() {
		const sectionsRef = db.collection("Sections");
		const getLevels = {};
		sectionsRef.get().then((snapshot) => {
			snapshot.docs.forEach((doc) => {
				const section = doc.data();
				if (section.name === "LEARN") {
					getLevels[section.name] = section.prompts;
				} else {
					getLevels[section.name] = section.levels;
				}
			});
			setLevels(getLevels);
		});
	}

	function setPlayerPoints(pts) {
		db.collection("Users").doc(isLoggedIn.uid).update({ points: pts });
	}

	const defineDifficulty = async (currentLevelName) => {
		if (
			!dbUser.progress[currentLevelName].easy &&
			!dbUser.progress[currentLevelName].medium &&
			!dbUser.progress[currentLevelName].hard &&
			!dbUser.progress[currentLevelName].text
		) {
			await setDifficulty("easy");
		} else if (
			dbUser.progress[currentLevelName].easy &&
			!dbUser.progress[currentLevelName].medium &&
			!dbUser.progress[currentLevelName].hard &&
			!dbUser.progress[currentLevelName].text
		) {
			await setDifficulty("medium");
		} else if (
			dbUser.progress[currentLevelName].easy &&
			dbUser.progress[currentLevelName].medium &&
			!dbUser.progress[currentLevelName].hard &&
			!dbUser.progress[currentLevelName].text
		) {
			await setDifficulty("hard");
		} else if (
			dbUser.progress[currentLevelName].easy &&
			dbUser.progress[currentLevelName].medium &&
			dbUser.progress[currentLevelName].hard &&
			!dbUser.progress[currentLevelName].text
		) {
			await setDifficulty("text");
    }
	};

	const updateProgress = (levelName, difficulty) => {
		let progressUpdate = {};
		progressUpdate[`progress.${levelName}.${difficulty}`] = true;
		db.collection("Users").doc(isLoggedIn.uid).update(progressUpdate);
	};

	const value = {
		dbUser,
		getDbUser,
		setDbUser,
		getLevels,
		levels,
		setCurrentLevel,
		currentLevel,
		setPlayerPoints,
		difficulty,
		setDifficulty,
		defineDifficulty,
		updateProgress,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
