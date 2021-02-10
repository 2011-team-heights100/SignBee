import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { Button, Typography, TextField, Link, FormControl } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useUser } from '../contexts/UserContext';

export default function UpdateProfile() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const firstNameRef = useRef();
	const lastNameRef = useRef();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const {
		currentUser,
		updateEmail,
		updatePassword,
		updateUser,
	} = useAuth();
	const { dbUser, getDbUser } = useUser();
	const history = useHistory();

	useEffect(() => {
		getDbUser()
	}, [currentUser])

	function handleSubmit(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match");
		}
		const promises = [
			updateUser(firstNameRef.current.value, lastNameRef.current.value),
		];
		setLoading(true);
		setError("");

		if (emailRef.current.value !== currentUser.email) {
			promises.push(updateEmail(emailRef.current.value));
		}
		if (passwordRef.current.value) {
			promises.push(updatePassword(passwordRef.current.value));
		}
		;

		Promise.all(promises)
			.then(() => {
				history.push("/dashboard");
			})
			.catch(() => {
				setError("Failed to update account");
			})
			.finally(() => {
				setLoading(false);
			});
	}

	return (
		currentUser && (
			<>
				<div className="centerme">
					<div className="logo-container">
						<img
							src={process.env.PUBLIC_URL + "/signbee_logo.svg"}
							id="bee"
							alt="beeLogo"
						/>
					</div>
					<div className="formdiv">
						<br />
						<Typography variant="h2">UPDATE</Typography>
						{error && <Alert severity="error">{error}</Alert>}
						<FormControl margin="normal">
							<TextField
								type="text"
								label="First Name"
								inputRef={firstNameRef}
								defaultValue={dbUser.firstName}
							/>
							<TextField
								type="text"
								label="Last Name"
								inputRef={lastNameRef}
								defaultValue={dbUser.lastName}
							/>
							<TextField
								required
								type="email"
								label="Email"
								inputRef={emailRef}
								defaultValue={currentUser.email}
							/>
							<TextField
								type="password"
								label="Password"
								inputRef={passwordRef}
								placeholder="Leave blank to keep the same password"
							/>
							<TextField
								type="password"
								label="Confirm Password"
								inputRef={passwordConfirmRef}
								placeholder="Leave blank to keep the same password"
							/>
							<Link to="/resetpassword">Reset Password</Link>
							<Button type="submit" disabled={loading} onClick={handleSubmit}>
								Update Profile
							</Button>
							<Button
								variant="outlined"
								onClick={() => history.push("/dashboard")}
							>
								Back
							</Button>
						</FormControl>
					</div>
				</div>
			</>
		)
	);
}
