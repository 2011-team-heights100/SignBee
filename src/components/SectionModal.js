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
	}, []);

	if (dbUser) {
		let progress = dbUser.progress[name];
		for (let key in progress) {
			if (progress[key] === true) levelsCompleted++;
		}
	}

	async function handleClick() {
		await setCurrentLevel(levels[name]);
    await defineDifficulty(name);
    //not recognizing difficulty right away
		if (difficulty === "hard") {
			history.push("/gameplaytext");
		} else {
			history.push("/app");
		}
		console.log("difficulty in SM", difficulty);
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
					<ListItemText primary={levelsCompleted + "/3"} />
				</ListItem>
			</List>
			<Button onClick={() => handleClick()}>Begin</Button>
		</Dialog>
	);
}
