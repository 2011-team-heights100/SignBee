import React, { useContext, useState, useEffect } from "react";
import "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";
import {
	differenceInCalendarDays,
	isSameDay,
} from "date-fns";

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

	const updateLastPlayed = () => {
		const today = new Date();
		db.collection("Users").doc(isLoggedIn.uid).update({
			lastPlayed: today,
		});
	};

	const updateStreak = () => {
		let today = new Date();
		let streak = dbUser.streak;
		let lastPlayed = dbUser.lastPlayed.toDate(); //last time player played a game
		let updatedStreak = dbUser.updatedStreak.toDate(); //date when streak was updated

		//checks the difference between today and last played date
		const diff = differenceInCalendarDays(today, lastPlayed);

		//checks if streak was updated in the last 24 hrs
    const streakAlreadyUpdated = isSameDay(today, updatedStreak)

		if (diff <= 1 && !streakAlreadyUpdated) {
			streak++;
		} else if (diff > 1) {
			streak = 1;
		}
		db.collection("Users").doc(isLoggedIn.uid).update({
			streak: streak,
			updatedStreak: today,
		});
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
		updateLastPlayed,
		updateStreak,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
