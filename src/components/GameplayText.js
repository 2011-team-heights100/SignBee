import React, { useState, useEffect, useRef, useCallback } from "react";
import { Redirect } from "react-router-dom";
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

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function GameplayText() {
	document.body.style = "background: #FEF5E4";

  const { currentLevel} = useUser();
  const [gameState, setGameState] = useState(true);
  const [promptArr, setPromptArr] = useState(currentLevel.text);
  const [promptIdx, setPromptIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [prevTime, setPrevTime] = useState(Date.now() + 2000);
  const [points, setPoints] = useState(0);
  const [thumb, setThumb] = useState(false);

	const guessRef = useRef();

	const shufflePrompts = useCallback(() => {
    setPromptArr(shuffle(promptArr));
  });

  useEffect(() => {
    shufflePrompts();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

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
    } else if (
      guess === promptArr[promptIdx].letter &&
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
  
  console.log("points", points)
  console.log("maxPts", maxPts)

	return gameState ? (
		<div className="centerme">
			<div className="game-summary-container">
				{loading ? (
					<div className="loading">
						<Wobble>
							<img
								src={process.env.PUBLIC_URL + "/bee.png"}
								id="bee"
								alt="loadingBee"
							/>
						</Wobble>
						<br />
						<Typography variant="h2">Loading...</Typography>
					</div>
				) : (
					<div>
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
						<div className="text-submit-container">
							<TextField
								type="text"
								label="Your Answer"
								style={{ width: "8rem", alignSelf: "center" }}
								InputProps={{ style: { fontSize: 40, textAlign: "center" } }}
								inputProps={{ style: { fontSize: 40, textAlign: "center" } }}
								inputRef={guessRef}
								onKeyDown={(e) => {
									if (e.key === "Enter") handleClick();
								}}
							></TextField>
							<Button
								onClick={handleClick}
								style={{ maxWidth: "50%", alignSelf: "center" }}
							>
								Submit
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	) : (
		<Redirect
			to={{ pathname: "/gamesummary", state: { totalPts: points, maxPts } }}
		/>
	);
}
