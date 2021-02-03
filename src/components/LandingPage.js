import React from "react";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";

function LandingPage() {
	const history = useHistory();
	return (
		<div className="centerme">
			<div>SignBee Logo</div>
			<br />
			<br />
			<div className="landingbody">
				<Link className="aboutlink" to="/about">
					{" "}
					<h2>SIGNBEE</h2>
				</Link>
				<br />
				<br />
				<Button onClick={() => history.push("/signin")}>Sign In </Button>
				<Button variant="outlined" onClick={() => history.push("/signup")}>
					{" "}
					Create Account
				</Button>
			</div>
		</div>
	);
}

export default LandingPage;
