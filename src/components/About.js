import React from "react";
import { Button, Typography } from "@material-ui/core";

function About() {
	return (
		<>
			<div className="centerme">
				<div>
					<img
						src={process.env.PUBLIC_URL + "/signbee_logo.png"}
						id="bee"
						alt="beeLogo"
					/>
				</div>
				<br />
				<div className="landingbody">
					<Typography variant="h2">ABOUT US</Typography>
					<br />
					<div>
						<Typography variant="h6">
							Our goal is to create an American Sign Language alphabet learning
							app to breach communication barriers between hearing and
							non-hearing people.
						</Typography>
						<br />
						<Typography variant="h6">Created Feburary 2021</Typography>
						<Typography variant="h6">By: Team Heights100</Typography>
					</div>
					<br />
					<div>
						<a href="/">
							<Button variant="outlined" color="primary">
								Back
							</Button>
						</a>
					</div>
				</div>
			</div>
		</>
	);
}

export default About;
