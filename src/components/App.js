import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
import Webcam from "react-webcam";
import { drawHand } from "../utilities";

import Handsigns from "../handsigns";
import { dispose } from "@tensorflow/tfjs";
import { Typography } from "@material-ui/core";
import PlayLevel from "./PlayLevel";

const lettersFromDatabase = ["A", "B", "C", "D"];

function App() {
  const webcamRef = useRef(null);
  //   const canvasRef = useRef(null);
  const [guess, setGuess] = useState("");
  const [timer, setTimer] = useState(10);
  const [game, setGame] = useState("");
  const [promptArray, setPromptArray] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [feedback, setFeedback] = useState(null); //import into public file
  const [nextPrompt, setNextPrompt] = useState(true);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    setPromptArray(lettersFromDatabase);
  }, []);

  const rightAnswers = [];
  const wrongAnswers = [];

  // //if(letters)
  // let stoppingPoint = letters.length;
  // let counter = 0;
  // if (stoppingPoint > 0) {
  //   if (nextPrompt) {
  //     setNextPrompt(false);
  //     setPrompt(letters[counter]);
  //     counter++;
  //   }
  // }

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

      //made detections
      const hand = await net.estimateHands(video);

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

        let i = 0;
        let interval = setInterval(() => {
          setPrompt(promptArray[i]);
          i++;
          if (i === promptArray.length) {
            clearInterval(interval);
          }
        }, 5000);

        const estimatedGestures = await GE.estimate(hand[0].landmarks, 6.5);

        let estimated = estimatedGestures.gestures.sort(
          (a, b) => b.confidence - a.confidence
        );

        if (estimated[0]) setGuess(estimated[0].name);
      }
      //console.log("Num of tensors:", tf.memory().numTensors);
    }
  };

  // function timerFunc() {
  //   if (timer > 0) {
  //     setTimeout(() => setTimer(timer - 1), 500);
  //     console.log("this is the timer", timer);
  //   }
  // }
  //timerFunc();
  //useEffect(() => {
  runHandpose();
  //}, []);

  return (
    <div className="App video-container">
      <header className="App-header">
        {/* <Typography variant="h5" align="center" color="primary">
          Are you ready to Sign? 👍
        </Typography> */}
        <Webcam className="video" ref={webcamRef} />
      </header>
      <div>
        <Typography id="gesture-guess" color="initial">
          GUESS {guess}
        </Typography>
        {/* <div>{timer}</div> */}
        <div className="prompt-card">
          <div className="prompt-box">
            <div className="prompt-content">
              <h4>{prompt}</h4>
            </div>
          </div>
        </div>
      </div>
      <div>Wait up!.. Loading</div>
    </div>
  );
}

export default App;
