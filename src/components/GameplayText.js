import React, { useState, useEffect, useRef } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { Button, TextField, Typography } from "@material-ui/core";
import { ThumbUp, Grade } from "@material-ui/icons";
import { wobble, bounceInUp } from "react-animations";
import styled, { keyframes } from "styled-components";

const Wobble = styled.div`
	animation: 6s ${keyframes`${wobble}`} infinite;
`;
const BounceUp = styled.div`
	animation: 1s ${keyframes`${bounceInUp}`};
`;

const timeLimitForGuess = 5000;

export default function GameplayText() {
	document.body.style = "background: #FEF5E4";

	const { currentLevel } = useUser();
	const [gameState, setGameState] = useState(true);
	const [promptArr] = useState(currentLevel.text);
	const [promptIdx, setPromptIdx] = useState(0);
	// const [prompt, setPrompt] = useState(promptArr[promptIdx]);
	// const [loading, setLoading] = useState(true);
	const [prevTime, setPrevTime] = useState(Date.now() + 2000);
	const [points, setPoints] = useState(0);
	const [thumb, setThumb] = useState(false);

	const guessRef = useRef();

	const maxPts = promptArr.length;
	console.log("gameplaytext", currentLevel);
	const isGuessCorrect = (guess) => {
		const currTime = Date.now();
		// check has it been under 7 seconds
		// user has exceeded time limit
		const isWithinTimeLimit = currTime < prevTime + timeLimitForGuess;
		if (!isWithinTimeLimit) {
			setThumb(false);
			setPromptIdx(promptIdx + 1);
			setPrevTime(currTime);
		} else if (
			guess === promptArr[promptIdx].letter ||
			promptIdx < promptArr.length
		) {
			setThumb(true);
			setPoints(points + 1);
			setPromptIdx(promptIdx + 1);
			setPrevTime(currTime);
			setTimeout(() => setThumb(false), 1000);
		}

		if (promptIdx === promptArr.length - 1) {
			setGameState(false);
		} else {
			guessRef.current.value = "";
		}
	};

	const handleClick = async (e) => {
		await isGuessCorrect(guessRef.current.value.toUpperCase().trim());
	};

	return gameState ? (
		<div className="game-summary-container">
			<div className="game-summary">
				<div id="points-container">
					<div id="score">
						<Typography
							variant="h2"
							style={{ fontSize: 40, textAlign: "center" }}
						>
							{points}
						</Typography>
					</div>
					<div id="score-star">
						<Grade color="primary" style={{ fontSize: 100 }}></Grade>
					</div>
				</div>
				<div id="thumb-container">
					<div>
						{thumb && (
							<BounceUp>
								<ThumbUp color="primary" style={{ fontsize: 100 }} />
							</BounceUp>
						)}
					</div>
				</div>
				<div>
					<img
						height="200px"
						src={promptArr[promptIdx].picture}
						alt={promptArr[promptIdx].letter}
					/>
				</div>
				<br />
				<TextField
					type="text"
					label="Your Answer"
					// style={{ borderRadius: "50%" }}
					inputRef={guessRef}
					onKeyDown={(e) => {
						if (e.key === "Enter") handleClick();
					}}
				></TextField>
				<Button onClick={handleClick}>Submit</Button>
			</div>
		</div>
	) : (
		<Redirect
			to={{ pathname: "/gamesummary", state: { totalPts: points, maxPts } }}
		/>
	);
}
