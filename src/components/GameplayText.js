import React from "react";
import { useHistory } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import GradeIcon from "@material-ui/icons/Grade";

export default function GameplayText() {
	const history = useHistory();

	return (
		<div className="game-summary-container">
			<div className="game-summary">
				<GradeIcon color="primary" style={{ fontSize: 100 }}></GradeIcon>
				<br />
				<TextField
					type="text"
					label="Your Answer"
					style={{ borderRadius: "50%" }}
				></TextField>
				<Button onClick={() => history.push("/")}>Submit</Button>
			</div>
		</div>
	);
}
