import React from "react";
import Button from '@material-ui/core/Button';



function About () {

  return (
		<>
			<div className="centerme">
				<div>
					<img
						src={process.env.PUBLIC_URL + "/signbee_logo.svg"}
						id="bee"
						alt="beeLogo"
					/>
				</div>
				<br />
				<br />
				<div className="landingbody">
					<h2>SIGNBEE</h2>
					<br />
					<br />
					<div>
						<p>
							Our goal is to create an American Sign Language learning app to
							breach communication barriers between hearing and non-hearing
							people.
						</p>
						<p>created Feburary 2021</p>
						<p>by: Heights100</p>
					</div>
					<br />
					<div>
						<a href="/">
							<Button variant="contained" color="primary">
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
