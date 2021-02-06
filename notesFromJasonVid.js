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

	// const match = () => {
	// 	while (prompt !== "") {
	// 		if (guess === "" || prompt === "") {
	// 			setThumb("");
	// 		} else if (guess !== "" && guess === prompt) {
	// 			setPoints(points + 1);
	// 			setThumb(
	// 				<ThumbUp color="primary" style={{ fontSize: 100, float: "center" }} />
	// 			);
	// 		} else {
	// 			// setTimeout(() => {
	// 			setThumb(
	// 				<ThumbDown
	// 					color="primary"
	// 					style={{ fontSize: 100, float: "center" }}
	// 				/>
	// 			);
	// 			// }, 1000);
	// 		}
	// 	}
  // };
  

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