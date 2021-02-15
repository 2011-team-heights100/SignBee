import React from "react";
import { Button, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

function LandingPage() {
	const history = useHistory();
	return (
		<div className="centerme">
			<div className="logo-container">
				<Link className="aboutlink" to="/about">
					<img
						src={process.env.PUBLIC_URL + "/signbee_logo.png"}
						id="bee-landing"
						alt="beeLogo"
					/>
				</Link>
			</div>
			<br />
			<br />
			<div className="landingbody">
				<Typography
					variant="h6"
					style={{ paddingLeft: "20%", paddingRight: "20%" }}
				>
					Learn American Sign Language through play!
				</Typography>
				<br />
				<br />
				<Button onClick={() => history.push("/signin")}>Sign In </Button>
				<Button variant="outlined" onClick={() => history.push("/signup")}>
					Create Account
				</Button>
			</div>
		</div>
	);
}

export default LandingPage;
