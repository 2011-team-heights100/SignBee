export const drawHand = (predictions, ctx) => {
	if (predictions.length > 0) {
		predictions.forEach((prediction) => {
			const landmarks = prediction.landmarks;

			for (let i = 0; i < landmarks.length; i++) {
				const x = landmarks[i][0];
				const y = landmarks[i][1];
				console.log("so far so good over here too");
				//draw
				ctx.beginPath();
				ctx.arc(x, y, 5, 0, 3 * Math.PI);

				//line color
				ctx.fillStyle = "indigo";
				ctx.fill(); //use stroke if you want an outlined circle
			}
		});
	}
};