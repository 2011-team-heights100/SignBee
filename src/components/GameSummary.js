import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import GradeIcon from "@material-ui/icons/Grade";
import { useUser } from "../contexts/UserContext";

export default function GameSummary(props) {
	document.body.style = "background: #F6A400;";
	const history = useHistory();
	const {
		dbUser,
		getDbUser,
		getLevels,
		levels,
		setCurrentLevel,
		setPlayerPoints,
  } = useUser();
  const [totalPts, setTotalPts] = useState()

	useEffect(() => {
		getDbUser();
		getLevels();
	}, []);

	const addPoints = async () => {
		let userPoints = await dbUser.points;
		let newTotal = userPoints + props.points;
    await setPlayerPoints(newTotal);
    await setTotalPts(newTotal)
  };
  console.log("dbUser:", dbUser);

  dbUser && addPoints();
	
	// console.log("levels:", levels);
  // console.log("currentLevel:", props.currentLevel);
  
	// function handleClick() {
	// 	setCurrentLevel(levels[name]);
	// 	history.push("/app");
	// }

	return (
		<div className="game-summary-container">
			<div className="game-summary">
				<Typography variant="h2">Well Done!</Typography>
				<Typography>Your Score: {props.points}</Typography>
				<Typography>Total Points: {totalPts}</Typography>
				<GradeIcon color="primary" style={{ fontSize: 100 }}></GradeIcon>
				<br />
				<Button onClick={() => history.push("/")}>Next</Button>
				<Button variant="outlined" onClick={() => history.push("/")}>
					Play Again
				</Button>
				<Button variant="outlined" onClick={() => history.push("/dashboard")}>
					Dashboard
				</Button>
			</div>
		</div>
	);
}
