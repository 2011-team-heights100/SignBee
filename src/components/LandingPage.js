import React from "react";
import {Button, Typography} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

function LandingPage() {
	const history = useHistory();
	return (
		<div className="centerme">
			<div className="logo-container">
				<img
					src={process.env.PUBLIC_URL + "/signbee_logo.svg"}
					id="bee"
					alt="beeLogo"
				/>
			</div>
			<br />
			<br />
			<div className="landingbody">
				<Link className="aboutlink" to="/about">
					<Typography variant="h2">SIGNBEE</Typography>
				</Link>
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
