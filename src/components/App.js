import React, { useRef, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import * as tf from '@tensorflow/tfjs';
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
import Webcam from "react-webcam";
import Handsigns from "../handsigns";
import { Typography } from "@material-ui/core";
import { ThumbUp, Grade, HelpSharp } from "@material-ui/icons";
import { useUser } from "../contexts/UserContext";
import { wobble, bounceInUp, pulse } from "react-animations";
import styled, { keyframes } from "styled-components";

const Wobble = styled.div`
	animation: 6s ${keyframes`${wobble}`} infinite;
`;
const BounceUp = styled.div`
	animation: 1s ${keyframes`${bounceInUp}`};
`;
const Pulse = styled.div`
	animation: 2s ${keyframes`${pulse}`} infinite;
`;

let memo = {};
let hintCounter = 0;

function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

function App() {
	const { currentLevel, difficulty, getDbUser } = useUser();
	const webcamRef = useRef(null);
	const [guess, setGuess] = useState(null);
	const [promptArr, setPromptArr] = useState(currentLevel[difficulty].prompts);
	const [prompt, setPrompt] = useState("");
	const [loading, setLoading] = useState(true);
	const [gameState, setGameState] = useState(true);
	const [hint, setHint] = useState("");
	const [showHint, setShowHint] = useState(false);
	const [accuracy, setAccuracy] = useState(6);

	const defineGameLevel = () => {
		getDbUser();
		if (difficulty === "easy") {
			setAccuracy(6.5);
			//display hints
		} else if (difficulty === "medium") {
			setAccuracy(7);
			//hide hints
		} else if (difficulty === "hard") {
			setAccuracy(7.5);
			setPromptArr(shuffle(promptArr));
		}
	};

	const runHandpose = async () => {
		const net = await handpose.load();
		//loop and detect hands
		return setInterval(() => {
			detect(net);
		}, 500);
	};

	const detect = async (net) => {
		//check if data is available
		if (
			typeof webcamRef.current !== "undefined" &&
			webcamRef.current !== null &&
			webcamRef.current.video.readyState === 4
		) {
			//get video properties
			const video = webcamRef.current.video;
			const videoWidth = video.videoWidth;
			const videoHeight = video.videoHeight;

			// set video h and w
			video.width = videoWidth;
			video.height = videoHeight;

			//make detections
			const hand = await net.estimateHands(video);

			if (hand.length > 0) {
				const GE = new fp.GestureEstimator([
					Handsigns.aSign,
					Handsigns.bSign,
					Handsigns.cSign,
					Handsigns.dSign,
					Handsigns.eSign,
					Handsigns.fSign,
					Handsigns.gSign,
					Handsigns.hSign,
					Handsigns.iSign,
					Handsigns.jSign,
					Handsigns.kSign,
					Handsigns.lSign,
					Handsigns.mSign,
					Handsigns.nSign,
					Handsigns.oSign,
					Handsigns.pSign,
					Handsigns.qSign,
					Handsigns.rSign,
					Handsigns.sSign,
					Handsigns.tSign,
					Handsigns.uSign,
					Handsigns.vSign,
					Handsigns.wSign,
					Handsigns.xSign,
					Handsigns.ySign,
					Handsigns.zSign,
					Handsigns.middleFinger,
				]);

				const estimatedGestures = await GE.estimate(
					hand[0].landmarks,
					accuracy
				);

				let estimated = estimatedGestures.gestures.sort(
					(a, b) => b.confidence - a.confidence
				);

				if (estimated[0]) setGuess(estimated[0].name);
			}
		}
	};

	//display the prompt every 5 seconds
	const displayPrompt = () => {
		let i = 0;

		const interval = setInterval(async () => {
			setShowHint(false);

			if (difficulty === "easy") {
				await setHint(currentLevel.easy.hints[i]);
			}

			await setPrompt(promptArr[i++]);

			if (i > promptArr.length) {
				clearInterval(interval);
				setGameState(false);
			}
		}, 5000);
	};

	useEffect(() => {
		const handposeInterval = runHandpose();
		defineGameLevel();
		const loadingTimer = setTimeout(() => {
			setLoading(false);
			displayPrompt();
		}, 10000);
		return () => {
			clearInterval(handposeInterval);
			clearTimeout(loadingTimer);
			memo = {};
		};
	}, []);

	if ((guess !== "" || prompt !== "") && guess === prompt) {
		memo[guess] = true;
  }

  const maxPts = promptArr.length;
  let totalPts = Object.keys(memo).length - hintCounter;

  const isAMatch = (guess !== "" || prompt !== "") && guess === prompt;

	return gameState ? (
		<div className="App video-container">
			<header className="App-header">
				<Webcam className="video" ref={webcamRef} />
			</header>
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
				<div className="game-container">
					<div id="points-container">
						<div id="score">
							<Typography
								variant="h2"
								style={{ fontSize: 40, textAlign: "center" }}
							>
								{totalPts}
							</Typography>
						</div>
						<div id="score-star">
							<Grade color="primary" style={{ fontSize: 100 }}></Grade>
						</div>
					</div>
					<div className="prompt-card">
						<div id="thumb-containter">
							<div>
								{isAMatch && (
									<BounceUp>
										<ThumbUp color="primary" style={{ fontSize: 100 }} />
									</BounceUp>
								)}
								{!isAMatch && showHint ? (
									<BounceUp>
										<div className="hint-container">
											<img id="hint" src={hint} alt={prompt} height="200px" />
										</div>
									</BounceUp>
								) : (
									""
								)}
							</div>
							{difficulty === "easy" && (
								<div id="hint-button">
									<Pulse>
										<HelpSharp
											color="secondary"
											style={{ fontSize: 40 }}
											onClick={() => {
												setShowHint(true);
												hintCounter++;
												console.log("hint count: ", hintCounter);
											}}
										></HelpSharp>
									</Pulse>
								</div>
							)}
						</div>
						<div className="prompt-box">
							<div className="prompt-content">
								<Typography variant="h5" id="gesture-guess">
									YOUR GUESS {guess}
								</Typography>
								<Typography variant="h2" style={{ fontSize: 55, marginBottom: 10 }}>
									Prompt: {prompt}
								</Typography>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	) : (
		<Redirect to={{ pathname: "/gamesummary", state: { totalPts, maxPts } }} />
	);
}

export default App;
