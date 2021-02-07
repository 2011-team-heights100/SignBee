import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import GradeIcon from "@material-ui/icons/Grade";

export default function GameSummary(props) {
	document.body.style = "background: #F6A400;";
  const history = useHistory();
  
	// function handleClick() {
	// 	setCurrentLevel(levels[name]);
	// 	history.push("/app");
  // }
  
	return (
		<div className="game-summary-container">
			<div className="game-summary">
				<Typography variant="h2">Well Done!</Typography>
				<Typography>Total Points: {props.points}</Typography>
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
