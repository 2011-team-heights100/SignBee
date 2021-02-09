import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";
import {
	Dialog,
	List,
	ListItem,
	ListItemText,
	Button,
	Typography,
} from "@material-ui/core";

export default function SectionModal({ name, show }) {
	const {
		dbUser,
		getDbUser,
		levels,
		getLevels,
		currentLevel,
		setCurrentLevel,
		defineDifficulty,
		difficulty,
	} = useUser();
	const history = useHistory();
	let levelsCompleted = 0;

	useEffect(() => {
		getDbUser();
		getLevels();
		// return console.log("unmounted");
	}, []);

	if (dbUser) {
		let progress = dbUser.progress[name];
		for (let key in progress) {
			if (progress[key] === true) levelsCompleted++;
		}
	}

	// console.log("levels", levels)
	// console.log("progress", dbUser.progress);

	async function handleClick() {
		await setCurrentLevel(levels[name]);
		// console.log("currentLevel", currentLevel);
    // console.log("name", name);
    
		if (name === "LEARN") {
			history.push("/learn");
		} else {
			await defineDifficulty(name);
			if (
				dbUser.progress[name].easy &&
				dbUser.progress[name].medium &&
				dbUser.progress[name].hard &&
				!dbUser.progress[name].text
			) {
				history.push("/gameplaytext");
			} else {
				history.push("/app");
			}
		}

		console.log("difficulty", difficulty);
	}

	return (
		<Dialog open={show}>
			<Typography variant="h2" align="center">
				{name}
			</Typography>
			<List>
				{/* <ListItem>
					<ListItemText primary="Lives" />
				</ListItem> */}
				<ListItem>
					<ListItemText primary="LEVELS COMPLETED: " />
					<ListItemText primary={levelsCompleted + "/4"} />
				</ListItem>
			</List>
			<Button onClick={() => handleClick()}>Begin</Button>
		</Dialog>
	);
}
