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

//import Prompt from "./Prompt";

const lettersFromDatabase = ["A", "B", "C", "D"];

function App() {
  let hand = 0;
  const webcamRef = useRef(null);
  //   const canvasRef = useRef(null);
  const [guess, setGuess] = useState("");
  const [timer, setTimer] = useState(10);
  const [game, setGame] = useState("");
  const [promptArray, setPromptArray] = useState([]);
  const [prompt, setPrompt] = useState("A");
  //const [feedback, setFeedback] = useState(null); //import into public file
  const [nextPrompt, setNextPrompt] = useState(true);
  const [points, setPoints] = useState(0);
  const [isRightOrWrong, setRightOrWrong] = useState("");

  // useEffect(() => {
  //   setPromptArray(lettersFromDatabase);
  // }, []);

  //dummy data
  // lettersFromDatabase.forEach((char, i) => {
  //   //console.log(this.state);
  //   //console.log(el);
  //   setTimeout(() => {
  //     console.log(char);
  //   }, 5000 * (i + 1));
  // });

  //have a loading screen while the model loads
  //store the model in indexedDB

  // initially set your prompt
  const changePrompt = () => {
    //randomly generate A B C D
    let randomNum = Math.floor(Math.random() * (3 - 0 + 1) + 0);
    setPrompt(lettersFromDatabase[randomNum]);
  };

  const runHandpose = async () => {
    const net = await handpose.load();
    console.log("loaded!");

    changePrompt();

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
      hand = await net.estimateHands(video);

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

        // let i = 0;
        // let interval = setInterval(() => {
        //   setPrompt(promptArray[i]);
        //   i++;
        //   if (i === promptArray.length) {
        //     clearInterval(interval);
        //   }
        // }, 5000);

        //dummy data
        // lettersFromDatabase.map((char, i) => {
        //   //console.log(this.state);
        //   //console.log();
        //   setPrompt(char);
        //   console.log("state", prompt);
        //   // setInterval(() => {
        //   //   //console.log(char);
        //   // }, 5000 * (i + 1));
        // });

        const estimatedGestures = await GE.estimate(hand[0].landmarks, 6.5);

        let estimated = estimatedGestures.gestures.sort(
          (a, b) => b.confidence - a.confidence
        );

        if (estimated[0]) setGuess(estimated[0].name);

        // hand detected and made a guess, now we have to check if guess is right
        isGuessCorrect();
      }
      //console.log("Num of tensors:", tf.memory().numTensors);
    }
  };

  // function that compares your guess with the prompt
  const isGuessCorrect = () => {
    if (guess === prompt) {
      setRightOrWrong("Correct");
      //set timer here that lasts for 3 seconds that says yay correct! onto the next prompt or you earned a point
      changePrompt();
    } else if (guess !== prompt) {
      setRightOrWrong("Try Again!");
    }
  };

  runHandpose();

  // function timerFunc() {
  //   if (timer > 0) {
  //     setTimeout(() => setTimer(timer - 1), 500);
  //     console.log("this is the timer", timer);
  //   }
  // }
  //timerFunc();
  //useEffect(() => {
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
              {/* <Prompt /> */}
              <h4>{prompt}</h4>
            </div>
          </div>
        </div>
      </div>
      <Typography id="gesture-guess" color="initial">
        IS GUESS CORRECT: {isRightOrWrong}
      </Typography>
      {/* <div>Wait up!.. Loading</div> */}
    </div>
  );
}

export default App;
