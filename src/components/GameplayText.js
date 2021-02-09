import React, { useState, useEffect, useRef } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { Button, TextField } from "@material-ui/core";
import { ThumbUp, Grade } from "@material-ui/icons";
import { wobble, bounceInUp } from "react-animations";
import styled, { keyframes } from "styled-components";

const Wobble = styled.div`
	animation: 6s ${keyframes`${wobble}`} infinite;
`;
const BounceUp = styled.div`
	animation: 1s ${keyframes`${bounceInUp}`};
`;

let memo = {};
const timeLimitForGuess = 5000;

export default function GameplayText() {
	const history = useHistory();
	const { currentLevel, difficulty } = useUser();
	const [gameState, setGameState] = useState(true);
  const [promptArr] = useState(currentLevel.text);
	const [prompt, setPrompt] = useState("");
	const [loading, setLoading] = useState(true);
  const [guess, setGuess] = useState(null);
  const [prevTime, setPrevTime] = useState(Date.now() + 2000);
	const [promptIdx, setPromptIdx] = useState(0);
  const [thumb, setThumb] = useState(false);

	const guessRef = useRef();

	const maxPts = promptArr.length;

	const isGuessCorrect = (guess) => {
		const currTime = Date.now();
		// check has it been under 7 seconds
		// user has exceeded time limit
		const isWithinTimeLimit = currTime < prevTime + timeLimitForGuess;
		if (!isWithinTimeLimit) {
			setThumb(false);
			setPromptIdx(promptIdx + 1);
			setPrevTime(currTime);
			setPrompt(promptArr[promptIdx]);
		} else if (isWithinTimeLimit && guess === prompt.letter) {
			setThumb(true);
			setPromptIdx(promptIdx + 1);
			setPrevTime(currTime);
			setPrompt(promptArr[promptIdx]);
		}
  };

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 4000);
		return () => {
			memo = {};
		};
  }, []);
  
  useEffect(() => {
		isGuessCorrect(guess);
		//when the guess changes and the time changes
	}, [guess, prevTime]);

	const handleClick = async (e) => {
    e.preventDefault();
		await setGuess(guessRef.toUpperCase().trim());
		await isGuessCorrect(guess)
    setGuess("");
	};

	let totalPts = Object.keys(memo).length;

	return gameState ? (
		<div className="game-summary-container">
			<div className="game-summary">
        <div>
          <img src={prompt.picture} alt={prompt.letter} />
        </div>
				<br />
				<TextField
					type="text"
					label="Your Answer"
					style={{ borderRadius: "50%" }}
					inputRef={guessRef}
				></TextField>
				<Button onClick={handleClick}>Submit</Button>
			</div>
		</div>
	) : (
		<Redirect to={{ pathname: "/gamesummary", state: {} }} />
	);
}
