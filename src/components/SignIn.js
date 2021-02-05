import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { Button, Typography, TextField} from "@material-ui/core";

export default function SignIn() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { signin } = useAuth();
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError("");
			setLoading(true);
			await signin(emailRef.current.value, passwordRef.current.value);
			history.push("/dashboard");
		}
		catch (error) {
			setError(`${error.message}`);
			console.log(error);
		}
		setLoading(false);
	}

	return (
		<>
			<div className="centerme">
				<div>SignBee Logo</div>
				<br />
				<br />
				<div className="formdiv">
					<Typography variant="h2">SIGN IN</Typography>
					{error && <div>{error}</div>}

					<form className="verticalform" onSubmit={handleSubmit}>
						<TextField type="email" label="Email" inputRef={emailRef} />
						<TextField
							type="password"
							label="Password"
							inputRef={passwordRef}
						/>
						<br />
						<br />
						<Button type="submit" disabled={loading}>
							Sign In
						</Button>
					</form>
					<Button variant="outlined" onClick={() => history.push("/")}>
						Back
					</Button>
				</div>
			</div>
		</>
	);
}
//  <div>
//     Need an account? <Link to="/signup">Sign Up</Link>
//   </div>
