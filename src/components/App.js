import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
import Webcam from "react-webcam";
import Handsigns from "../handsigns";
// import { dispose } from "@tensorflow/tfjs";
import { Typography } from "@material-ui/core";
import { ThumbUp, ThumbDown } from "@material-ui/icons";
// import ThumbDownIcon from "@material-ui/icons/ThumbDown";

let importedLetters = ["A", "B", "C", "D"];

function App() {
	const webcamRef = useRef(null);
	const [guess, setGuess] = useState("");
	const [points, setPoints] = useState(0);
	const [promptArr, setPromptArr] = useState(importedLetters);
	const [prompt, setPrompt] = useState("");

	const runHandpose = async () => {
		const net = await handpose.load();
		console.log("loaded!");
		//loop and detect hands
		//if there's a hand, increase pose detection speed, otherwise, slow it down
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

			//made detections
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

				// the following code is a sample function we might use to delay a user getting an answer wrong.
				// const prompt = {
				//    q: "a",
				//    answer: Handsigns.aSign,
				//    next:
				// }

				// const moveOn = async (correctAnswer, userGesture) => {
				//    await delay(5000)
				//    if (correctAnswer === userGesture) {
				//       prompt.next
				//    }
				// }
				// moveOn(prompt.answer, estimated[0])

				// console.log("gesture:", estimated[0]);

				//the line below logs the amount of tensors that are stored in our environment when the app runs. We need to clean those up periodically

				if (estimated[0]) setGuess(estimated[0].name);

				// tf.dispose(hand); <---cleanup method. But it doesn't work...yet
			}
			console.log("Num of tensors:", tf.memory().numTensors);
		}
	};

  //display the prompt every 5 seconds
	const displayPrompt = () => {
		let i = 0;
		// const interval =
		setInterval(async () => {
			await setPrompt(promptArr[i++]);
		}, 5000);
	};

	useEffect(() => {
		// setPromptArr(importedLetters);
		runHandpose();
		displayPrompt();
	}, []);

	return (
		<div className="App video-container">
			<header className="App-header">
				<Webcam className="video" ref={webcamRef} />
			</header>
      
			<div className="prompt-card">
        <div>
        <div>
					{guess !== "" && guess === prompt ? (
						<ThumbUp color="primary" style={{ fontSize: 100, float: "center" }} />
					) : (
						""
					)}
				</div>
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
		</div>
	);
}

export default App;
