import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import GradeIcon from "@material-ui/icons/Grade";
import { useUser } from "../contexts/UserContext";

let counter = 0;

export default function GameSummary(props) {
	document.body.style = "background: #F6A400;";

	const history = useHistory();
	const {
		dbUser,
		getDbUser,
		getLevels,
		levels,
		currentLevel,
		setCurrentLevel,
		setPlayerPoints,
		updateProgress,
		difficulty,
		defineDifficulty,
	} = useUser();
	const [totalPts, setTotalPts] = useState();

	useEffect(() => {
		getDbUser();
		getLevels();
		return () => (counter = 0);
	}, []);

	const addPoints = async () => {
		counter++;
		let userPoints = await dbUser.points;
		let newTotal = userPoints + props.location.state.totalPts;
		await setPlayerPoints(newTotal);
		await setTotalPts(newTotal);
		if (props.location.state.totalPts === props.location.state.maxPts) {
			await updateProgress(currentLevel.name, difficulty);
		}
	};
	console.log("dbUser:", dbUser);

	if (counter < 2) {
		dbUser && addPoints();
	}

	async function handleReplay() {
		await setCurrentLevel(levels[currentLevel.name]);
		await defineDifficulty(currentLevel.name);
		//not recognizing difficulty right away
		if (difficulty === "hard") {
			history.push({
				pathname: "/gameplaytext",
			});
		} else {
			history.push("/app");
		}
	}

	return (
		<div className="game-summary-container">
			<div className="game-summary">
				<Typography variant="h2">Well Done!</Typography>
				<Typography variant="h5">
					Your Score: {props.location.state.totalPts}
				</Typography>
				<Typography variant="h5">Total Points: {dbUser.points}</Typography>
				<GradeIcon color="primary" style={{ fontSize: 100 }}></GradeIcon>
				<br />
				{props.location.state.totalPts >= props.location.state.maxPts && (
					<Button onClick={handleReplay}>Next</Button>
				)}
				<Button variant="outlined" onClick={() => history.push("/app")}>
					Play Again
				</Button>
				<Button
					variant="outlined"
					onClick={() => {
						history.push("/dashboard");
						window.location.reload();
					}}
				>
					Dashboard
				</Button>
			</div>
		</div>
	);
}
