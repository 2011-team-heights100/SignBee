import React, { useRef, useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
import Webcam from "react-webcam";
import Handsigns from "../handsigns";
import { Typography } from "@material-ui/core";
import { ThumbUp, HighlightOff } from "@material-ui/icons";
import { useUser } from "../contexts/UserContext";
import { wobble, bounceInUp } from "react-animations";
import styled, { keyframes } from "styled-components";

const Wobble = styled.div`
	animation: 6s ${keyframes`${wobble}`} infinite;
`;
const BounceUp = styled.div`
	animation: 1s ${keyframes`${bounceInUp}`};
`;

const timeLimitForGuess = 10000;

function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

function Learn() {
	const webcamRef = useRef(null);
	const { currentLevel } = useUser();
	const [guess, setGuess] = useState(null);
	const [promptArr, setPromptArr] = useState([]);
	const [prompt, setPrompt] = useState("");
	const [loading, setLoading] = useState(true);
	const [gameState] = useState(true);
	const [prevTime, setPrevTime] = useState(Date.now() + 2000);
	const [promptIdx, setPromptIdx] = useState(0);
	const [thumb, setThumb] = useState(false);
	const history = useHistory();

	const runHandpose = async () => {
		const net = await handpose.load();

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
          Handsigns.middleFinger,
				]);

				const estimatedGestures = await GE.estimate(hand[0].landmarks, 6.5);

				let estimated = estimatedGestures.gestures.sort(
					(a, b) => b.confidence - a.confidence
				);

				if (estimated[0]) setGuess(estimated[0].name);
			}
		}
	};

	useEffect(() => {
		isGuessCorrect(guess);
		//when the guess changes and the time changes
	}, [guess, prevTime]);

	const isGuessCorrect = (guess) => {
		const currTime = Date.now();
    const isWithinTimeLimit = currTime < prevTime + timeLimitForGuess;

		if (!isWithinTimeLimit) {
			setThumb(false);
			setPromptIdx(promptIdx + 1);
			setPrevTime(currTime);
			setPrompt(promptArr[promptIdx]);
		} else if (isWithinTimeLimit && guess === prompt.letter) {
			setThumb(true);
			setPromptIdx(promptIdx + 1);
			setPrevTime(currTime);
			setPrompt(promptArr[promptIdx]);
			setTimeout(() => setThumb(false), 1000);
		}
	};

	useEffect(() => {
		const handposeInterval = runHandpose();
		setPromptArr(shuffle(currentLevel));
		const loadingTimer = setTimeout(() => {
			setLoading(false);
		}, 500);
		return () => {
			clearInterval(handposeInterval);
			clearTimeout(loadingTimer);
		}
	}, []);

	return gameState ? (
		<div className='App video-container'>
			<header className='App-header'>
				<Webcam className='video' ref={webcamRef} />
			</header>
			{loading ? (
				<div className='loading'>
					<Wobble>
						<img
							src={process.env.PUBLIC_URL + '/bee.png'}
							id='bee'
							alt='loadingBee'
						/>
					</Wobble>
					<br />
					<Typography variant='h2'>Loading...</Typography>
				</div>
			) : (
				<div className='game-container'>
					<div id='points-container'>
						<div id='exit'>
							{' '}
							<HighlightOff
								color='primary'
								onClick={() => history.push('/dashboard')}
							></HighlightOff>
						</div>
					</div>
					<div className='prompt-card-learn'>
						<div id='thumb-containter-learn'>
							<div>
								{thumb && (
									<BounceUp>
										<ThumbUp color='primary' style={{ fontSize: 100 }} />
									</BounceUp>
								)}
							</div>
						</div>
						<div className='prompt-box-learn'>
							<div className='prompt-content-learn'>
								{guess ? (
									<div id='learn-prompt'>
											<Typography variant='h5' id='gesture-guess'>
												YOUR GUESS {guess}
											</Typography>
										<div id='prompt-img-letter'>
											<Typography
												variant='h2'
												style={{ fontSize: 100, marginRight: '-75px' }}
											>
												{prompt.letter}
											</Typography>
											<img
												id='prompt-img-learn'
												src={prompt.picture}
												alt={prompt.letter}
											/>
										</div>
									</div>
								) : (
									<>
										<Typography
											variant='h2'
											style={{ fontSize: 30, textAlign: 'center' }}
										>
											Match the signs!
										</Typography>
										<Typography
											variant='h3'
											style={{ fontSize: 30, textAlign: 'center' }}
										>
											Wave your hand do get started.
										</Typography>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	) : (
		<Redirect to={{ pathname: '/dashboard' }} />
	);
}

export default Learn;
