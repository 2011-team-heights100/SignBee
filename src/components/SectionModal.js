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
		setDifficulty,
		defineDifficulty,
		difficulty,
	} = useUser();
	const history = useHistory();
	const [difficultyOverride, setDifficultyOverride]= useState(false)
	let levelsCompleted = 0;
	let totalLevels = 0;

	useEffect(() => {
		getDbUser();
		getLevels();
		// return console.log("unmounted");
	}, []);

	if (dbUser) {
		let progress = dbUser.progress[name];
		for (let key in progress) {
			totalLevels++;
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
			if (!difficultyOverride){
			await defineDifficulty(name);
		}
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
	function handleButtonClick (chosenLevel){
		
		setDifficultyOverride(true);
		setDifficulty(chosenLevel)
	}

	return (
		<Dialog open={show}>
			<Typography variant="h2" align="center">
				{name}
			</Typography>
			<List align="center">
				{name !== "LEARN" && (
					true ?
					<>
					{/* <Typography variant="h2" align="center">
				{difficulty}
			</Typography> */}
								<Button onClick={()=>handleButtonClick("easy")}>Level I</Button>
								<Button onClick={()=>handleButtonClick("medium")}>Level II</Button>
								<Button onClick={()=>handleButtonClick("hard")}>Level III</Button>
								<Button onClick={()=>handleButtonClick("text")}>Level IV</Button>
					</>:
					<>
						<Typography variant="h5">LEVELS COMPLETE</Typography>
						<br />
						<Typography variant="h3" color="primary">
							{` ${levelsCompleted} / ${totalLevels}`}
						</Typography>
					</>
				)}

				{name === "LEARN" && <Typography variant="h6">Learn as long as you like! This section is untimed, and you don't receive points.</Typography>}
			</List>
			<Button onClick={() => handleClick()}>Begin</Button>
		</Dialog>
	);
}
