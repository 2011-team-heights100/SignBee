// player story:
// player starts level
// a prompt is displayed
// player is given 5 seconds to get it right
// if they get it right, they get a point
// if they don't, nothing happens
// at the end of the round, total points are added up and merged with the player's overall score
// incentive to get them to play more is saying how many points they could have gotten for the round. 

video= document.querySelector("#webcam")

video.srcObject = stream

//waits for data to be loaded before starting to predict
video.addEventListener("loadeddata", ()=> {
  model.detect(video).then(predictions=> {
    console.log({predictions})
  }
})

// attempts at matching prompt to guess
// const match = () => {
	//   if (guess !== "" && guess === prompt) {
	//     setPoints(points + 1)
	//     return true
	//   } else {
	//     setTimeout(() => {
	//       return false
	//     }, 4000)
	//   }
	// }

	const match = () => {
		while (prompt !== "") {
			if (guess === "" || prompt === "") {
				setThumb("");
			} else if (guess !== "" && guess === prompt) {
				setPoints(points + 1);
				setThumb(
					<ThumbUp color="primary" style={{ fontSize: 100, float: "center" }} />
				);
			} else {
				// setTimeout(() => {
				setThumb(
					<ThumbDown
						color="primary"
						style={{ fontSize: 100, float: "center" }}
					/>
				);
				// }, 1000);
			}
		}
  };

  useEffect(() => {
    // runHandpose();
    if (loading === false) displayPrompt();
	}, []);
  

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
        

//======================================
// working code gameplay

import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
import Webcam from "react-webcam";
import Handsigns from "../handsigns";
// import { dispose } from "@tensorflow/tfjs";
import { Typography, Fade, CircularProgress } from "@material-ui/core";
import { ThumbUp, ThumbDown } from "@material-ui/icons";
import { useUser } from "../contexts/UserContext";
// import ThumbDownIcon from "@material-ui/icons/ThumbDown";

const dummyPrompts = ["A", "B", "C", "D"];
// currentLevel.easy.prompts

function App({ rounds }) {
	const webcamRef = useRef(null);
	const [guess, setGuess] = useState("");
	const [points, setPoints] = useState(0);
	const { currentLevel, dbUser } = useUser();
	const [promptArr, setPromptArr] = useState(dummyPrompts);
	const [prompt, setPrompt] = useState("");
	const [loading, setLoading] = useState(true);
	// const [thumb, setThumb] = useState("");

	// console.log(currentLevel);

	const runHandpose = async () => {
		const net = await handpose.load();
		console.log("handpose loaded!");

		// run detect once to set loading state to false
		// detect(net);
		setLoading(false);
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

			console.log("detection loading", loading);

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
			// console.log(points);
		}
	};

	//display the prompt every 5 seconds
	const displayPrompt = () => {
		let i = 0;
		setInterval(async () => {
			// match();
			await setPrompt(promptArr[i++]);
		}, 5000);
	};

	// const match = () => {
	// 	if ((guess !== "" || prompt !== "") && guess === prompt) {
	// 		setPoints((prevPoints) => prevPoints + 1);
	// 	}
	// };

	// const play = () => {
	// 	runHandpose();
	// 	if (loading === false) displayPrompt();
	// 	match();
	// };

	useEffect(() => {
    // runHandpose();
    displayPrompt();
	}, []);

	return (
		<div className="App video-container">
			<header className="App-header">
				<Webcam className="video" ref={webcamRef} />
			</header>
			{loading ? (
				<div className="loading">
					<CircularProgress />
					<br />
					<Typography variant="h2">Loading...</Typography>
				</div>
			) : (
				<div className="prompt-card">
					<div id="thumb-containter">
						<div>
							{
								(guess !== "" || prompt !== "") && guess === prompt ? (
									<ThumbUp color="primary" style={{ fontSize: 100 }} />
								) : (
									""
								)
								// <ThumbDown color="primary" style={{ fontSize: 100 }} />
							}
						</div>
						<Typography variant="h2">{points}</Typography>
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
	);
}

export default App;
