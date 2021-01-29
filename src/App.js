import React, { useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import {drawHand} from "./utilities"

function App() {
	const webcamRef = useRef(null);
	const canvasRef = useRef(null);

	const runHandpose = async () => {
		const net = await handpose.load();
      console.log("loaded!");
      
      //loop and detect hands
      setInterval(() => {
         detect(net)
      }, 100)
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
			const videoWidth = webcamRef.current.videoWidth;
			const videoHeight = webcamRef.current.videoHeight;

			// set video h and w
			webcamRef.current.video.width = videoWidth;
			webcamRef.current.video.height = videoHeight;
			//set canvas h and w
			canvasRef.current.width = videoWidth;
         canvasRef.current.height = videoHeight;
         
         //made detections
         const hand = await net.estimateHands(video)
         console.log(hand)
         //draw
         const ctx = canvasRef.current.getContext("2d"); 
         //change this for 3D maybe?
         drawHand(hand, ctx)
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
		</div>
	);
}

export default App;
