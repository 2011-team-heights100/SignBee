import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
import Webcam from "react-webcam";
// import { drawHand } from "../utilities";

import Handsigns from "../handsigns";
import { Typography, Box } from "@material-ui/core";

function App() {
  const webcamRef = useRef(null);
  const [guess, setGuess] = useState("");

  //have a loading screen while the model loads
  //store the model in indexedDB

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

      //set canvas h and w
      // canvasRef.current.width = videoWidth;
      // canvasRef.current.height = videoHeight;

      //made detections
      const hand = await net.estimateHands(video);

      // console.log(hand);

      //draw
      // const ctx = canvasRef.current.getContext("2d");

      //change this for 3D maybe?
      // requestAnimationFrame(() => {
      // 	drawHand(hand, ctx);

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

useEffect(() => {
   runHandpose()
}, []);

  //   function tensorMemory() {
  //     const memory = tf.memory().numTensors;
  //     return memory;
  //   }

  //   function disposeMemory() {
  //     tf.disposeVariables(() => {
  //       tensorMemory();
  //     });
  //   }
  //   disposeMemory();

  return (
    <div className="App video-container">
      <header className="App-header">
        <Typography variant="h5" align="center" color="primary">
          Are you ready to Sign? 👍
        </Typography>
        <Webcam
          className="video"
          ref={webcamRef}
          // style={{
          // 	position: "absolute",
          // 	marginLeft: "auto",
          // 	marginRight: "auto",
          // 	left: 0,
          // 	right: 0,
          // 	textAlign: "center",
          // 	zindex: 9,
          // 	width: 640,
          // 	height: 480,
          // }}
        />
        {/* <canvas
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
				/> */}
      </header>
      <Typography
        id="gesture-guess"
        color="initial"
        fontWeight="fontWeightBold"
      >
        GUESS {guess}
      </Typography>
      <div className="prompt-card">
        <div className="prompt-box">
          <div className="prompt-content">
            <p>PROMPT</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
