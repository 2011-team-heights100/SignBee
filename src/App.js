import React, { useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
import Webcam from "react-webcam";
import { drawHand } from "./utilities";

import Handsigns from "./handsigns";

function App() {
	const webcamRef = useRef(null);
   const canvasRef = useRef(null);
   const [guess, setGuess] = useState("")

	const runHandpose = async () => {
		const net = await handpose.load();
		console.log("loaded!");
		//loop and detect hands
		setInterval(() => {
			detect(net);
		}, 100);
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

			//set canvas h and w
			canvasRef.current.width = videoWidth;
			canvasRef.current.height = videoHeight;

			//made detections
			const hand = await net.estimateHands(video);
			// console.log(hand);

			//draw
			const ctx = canvasRef.current.getContext("2d");

			//change this for 3D maybe?
			drawHand(hand, ctx);

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
						)
            
            console.log("gesture:", estimated[0]);
            if (estimated[0]) setGuess(estimated[0].name)
			}
		}
	};

	runHandpose();

	return (
		<div className="App">
			<header className="App-header">
				<Webcam
					ref={webcamRef}
					style={{
						position: "absolute",
						marginLeft: "auto",
						marginRight: "auto",
						left: 0,
						right: 0,
						textAlign: "center",
						zindex: 9,
						width: 640,
						height: 480,
					}}
				/>
				<canvas
					ref={canvasRef}
					style={{
						position: "absolute",
						marginLeft: "auto",
						marginRight: "auto",
						left: 0,
						right: 0,
						textAlign: "center",
						zindex: 9,
						width: 640,
						height: 480,
					}}
				/>
			</header>
         <div id="gesture-guess">GUESS {guess}</div>
		</div>
	);
}

export default App;
