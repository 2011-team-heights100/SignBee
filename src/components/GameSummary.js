import React from 'react'
import { useHistory } from "react-router-dom";
import { Button, Typography, Paper} from "@material-ui/core";
import GradeIcon from "@material-ui/icons/Grade";

export default function GameSummary() {
    const history = useHistory();
    document.body.style = "background: #F6A400;";
  return (
		<div className="game-summary-container">
			<div className="game-summary">
				<Typography variant="h2">Well Done!</Typography>
				<Typography>Total Points</Typography>
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
