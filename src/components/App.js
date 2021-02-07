import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
import Webcam from "react-webcam";
import Handsigns from "../handsigns";
import { Typography } from "@material-ui/core";
import { ThumbUp } from "@material-ui/icons";
import { useUser } from "../contexts/UserContext";
import { wobble } from "react-animations";
import styled, { keyframes } from "styled-components";
import GameSummary from "./GameSummary";
const Bounce = styled.div`
	animation: 6s ${keyframes`${wobble}`} infinite;
`;

// const dummyPrompts = ["A", "B", "C", "D"];
// currentLevel.easy.prompts
let memo = {};

function App({ rounds }) {
	const webcamRef = useRef(null);
	const { currentLevel, dbUser, difficulty } = useUser();
	const [guess, setGuess] = useState(null);
	const [promptArr, setPromptArr] = useState(currentLevel[difficulty].prompts);
	const [prompt, setPrompt] = useState("");
	const [loading, setLoading] = useState(true);
	const [gameState, setGameState] = useState(true);
	const maxPts = promptArr.length;

	const runHandpose = async () => {
		const net = await handpose.load();
		console.log("handpose loaded!");

		//loop and detect hands
		setInterval(() => {
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
			// console.log(hand);

			if (hand.length > 0) {
				const GE = new fp.GestureEstimator([
					fp.Gestures.ThumbsUpGesture,
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
				]);

				const estimatedGestures = await GE.estimate(hand[0].landmarks, 6.5);

				let estimated = estimatedGestures.gestures.sort(
					(a, b) => b.confidence - a.confidence
				);

				if (estimated[0]) setGuess(estimated[0].name);
			}
			console.log("Num of tensors:", tf.memory().numTensors);
		}
	};

	//display the prompt every 5 seconds
	const displayPrompt = () => {
		let i = 0;
		const interval = setInterval(async () => {
			await setPrompt(promptArr[i++]);
			if (i > promptArr.length) {
				clearInterval(interval);
				setGameState(false);
				console.log("game ended", gameState);
			}
		}, 5000);
	};

	useEffect(() => {
		runHandpose();
		setTimeout(() => {
			setLoading(false);
			displayPrompt();
		}, 10000);
	}, []);

	if ((guess !== "" || prompt !== "") && guess === prompt) {
		memo[guess] = true;
	}

	let totalPts = Object.keys(memo).length;
  
	return gameState ? (
		<div className="App video-container">
			<header className="App-header">
				<Webcam className="video" ref={webcamRef} />
			</header>
			{loading ? (
				<div className="loading">
					<Bounce>
						<img
							src={process.env.PUBLIC_URL + "/bee.png"}
							id="bee"
							alt="loadingBee"
						/>
					</Bounce>
					<br />
					<Typography variant="h2">Loading...</Typography>
				</div>
			) : (
				<div className="prompt-card">
					<div id="thumb-containter">
						<div>
							{(guess !== "" || prompt !== "") && guess === prompt ? (
								<ThumbUp color="primary" style={{ fontSize: 100 }} />
							) : (
								""
							)}
						</div>
						<Typography variant="h2">{totalPts}</Typography>
					</div>
					<div className="prompt-box">
						<div className="prompt-content">
							<Typography id="gesture-guess" fontWeight="fontWeightBold">
								GUESS {guess}
							</Typography>
							<Typography variant="h2">Prompt: {prompt}</Typography>
						</div>
					</div>
				</div>
			)}
		</div>
	) : (
		<GameSummary points={totalPts} maxPts={maxPts} />
	);
}

export default App;
