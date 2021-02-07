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

const dummyPrompts = ["A", "B", "C", "D"];
const timeLimitForGuess = 10000;
// currentLevel.easy.prompts

function App({ rounds }) {
  const webcamRef = useRef(null);
  const [guess, setGuess] = useState(null);
  const [points, setPoints] = useState(0);
  const { currentLevel, dbUser } = useUser();
  const [promptArr, setPromptArr] = useState(dummyPrompts);
  const [prompt, setPrompt] = useState("");
  const [promptIdx, setPromptIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [thumb, setThumb] = useState(false);
  const [prevTime, setPrevTime] = useState(Date.now() + 2000);

  const Bounce = styled.div`
    animation: 6s ${keyframes`${wobble}`} infinite;
  `;
  // console.log(currentLevel);

  const runHandpose = async () => {
    const net = await handpose.load();
    console.log("handpose loaded!");
    setLoading(false);

    // setInterval(() => {
    //   detect(net);
    // }, 500);

    //loop and detect hands
    //if there's a hand, increase pose detection speed, otherwise, slow it down
    start(net);
  };

  const start = (net) => {
    setTimeout(async () => {
      await detect(net);
      start(net);
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

        if (estimated[0]) {
          setGuess(estimated[0].name);
          // isGuessCorrect(estimated[0].name);
        }
      }
      //console.log("Num of tensors:", tf.memory().numTensors);
    }
  };

  useEffect(() => {
    isGuessCorrect(guess);
    //when the guess changes and the time changes
  }, [guess, prevTime]);

  //display the prompt every 5 seconds
  //const displayPrompt = () => {
  // let i = 0;
  // setInterval(async () => {
  //   //console.log("promptArr", promptArr);
  //   //console.log("promptArr[0]", promptArr && promptArr[0]);
  //   setPrompt(promptArr[0]);
  // }, 7000);
  //};

  const isGuessCorrect = (guess) => {
    const currTime = Date.now();
    // check has it been under 7 seconds
    // user has exceeded time limit
    const isWithinTimeLimit = currTime < prevTime + timeLimitForGuess;
    if (!isWithinTimeLimit) {
      setThumb(false);
      setPromptIdx(promptIdx + 1);
      setPrevTime(currTime);
    } else if (isWithinTimeLimit && guess === dummyPrompts[promptIdx]) {
      setThumb(true);
      setPoints(points + 1);
      setPromptIdx(promptIdx + 1); // make random index betwen \dumm\y prompts
      setPrevTime(currTime);
    }
  };

  useEffect(() => {
    runHandpose();
    // setTimeout(() => {
    //   setLoading(false);
    // }, 10000);
  }, []);

  const currPrompt = dummyPrompts[promptIdx];
  //console.log("prompt outside", prompt);

  return (
    <div className="App video-container">
      <header className="App-header">
        <Webcam className="video" ref={webcamRef} />
      </header>
      {loading ? (
        <div className="loading">
          <Bounce>
            <img src={process.env.PUBLIC_URL + "/bee.png"} id="bee" />
          </Bounce>
          <br />
          <Typography variant="h2">Loading...</Typography>
        </div>
      ) : (
        <div className="prompt-card">
          <div id="thumb-containter">
            <div>
              {/* {(guess !== "" || prompt !== "") && guess === prompt ? (
                <ThumbUp color="primary" style={{ fontSize: 100 }} />
              ) : (
                ""
              )} */}
              {thumb ? (
                <ThumbUp color="primary" style={{ fontSize: 100 }} />
              ) : (
                ""
              )}
            </div>
            <Typography variant="h2">{points}</Typography>
          </div>
          <div className="prompt-box">
            <div className="prompt-content">
              <Typography id="gesture-guess" fontWeight="fontWeightBold">
                GUESS {guess}
              </Typography>
              <Typography variant="h2">Prompt: {currPrompt}</Typography>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
