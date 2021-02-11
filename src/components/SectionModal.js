import React, { useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";
import { Dialog, List, Button, Typography } from "@material-ui/core";

export default function SectionModal({ name, show }) {
	const {
		dbUser,
		getDbUser,
		levels,
		getLevels,
		setCurrentLevel,
		setDifficulty,
		defineDifficulty,
	} = useUser();
	const history = useHistory();
	let levelsCompleted = 0;
	let totalLevels = 0;

	useEffect(() => {
		getDbUser();
		getLevels();
	}, []);

	if (dbUser) {
		let progress = dbUser.progress[name];
		for (let key in progress) {
			totalLevels++;
			if (progress[key] === true) levelsCompleted++;
		}
	}

	const handleButtonClick = (chosenLevel) => (e) => {
		e.preventDefault();
		setDifficulty(chosenLevel);
		handleClick(chosenLevel);
	};

	async function handleClick(cL) {
		await setCurrentLevel(levels[name]);
		if (cL === "text") {
			history.push("/gameplaytext");
			return;
		} else if (cL !== "text" && cL !== undefined) {
			history.push("/app");
			return;
		}
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
	}

	if (name === "LEARN") {
		return (
			<Dialog open={show}>
				<Typography variant="h2" align="center">
					{name}
				</Typography>
				<List align="center">
					{name === "LEARN" && (
						<Typography variant="h6">
							Learn as long as you like! This section is untimed, and you don't
							receive points.
						</Typography>
					)}
				</List>
				<Button onClick={() => handleClick()}>Begin</Button>
			</Dialog>
		);
	} else if (levelsCompleted === totalLevels) {
		return (
			<Dialog open={show}>
				<Typography variant="h2" align="center">
					{name}
				</Typography>
				<List align="center">
					<>
						<Typography variant="h6" align="center">
							You are one smart cookie!
							<br />
							All levels in this section are unlocked.
						</Typography>
						<Button onClick={handleButtonClick("easy")}>Level I</Button>
						<Button onClick={handleButtonClick("medium")}>Level II</Button>
						<Button onClick={handleButtonClick("hard")}>Level III</Button>
						<Button onClick={handleButtonClick("text")}>Level IV</Button>
					</>
				</List>
			</Dialog>
		);
	} else {
		return (
			<Dialog open={show}>
				<Typography variant="h2" align="center">
					{name}
				</Typography>
				<List align="center">
					<>
						<Typography variant="h5">LEVELS COMPLETE</Typography>
						<br />
						<Typography variant="h2" color="primary">
							{` ${levelsCompleted} / ${totalLevels}`}
						</Typography>
						{levelsCompleted === 0 && (
							<Typography variant="h6">
								The first level has hints, but you will lose a point for looking
								at them! Use wisely.
							</Typography>
						)}
					</>
				</List>
				<Button onClick={() => handleClick()}>Begin</Button>
			</Dialog>
		);
	}
}
