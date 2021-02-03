import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { Button, Typography, TextField } from "@material-ui/core";
// import { db } from '../firebase';

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
		dbUser,
		updateUser,
	} = useAuth();
	const history = useHistory();

	console.log("dbUser", dbUser);
	function handleSubmit(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match");
		}
		const promises = [];
		setLoading(true);
		setError("");

		if (emailRef.current.value !== currentUser.email) {
			promises.push(updateEmail(emailRef.current.value));
		}
		if (passwordRef.current.value) {
			promises.push(updatePassword(passwordRef.current.value));
		}
		updateUser(firstNameRef.current.value, lastNameRef.current.value);

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
		<>
			<div className="centerme">
				<div>SignBee Logo</div>
				<br />
				<br />
				<div className="formdiv">
					<Typography variant="h2">UPDATE</Typography>
					{error && <div>{error}</div>}
					<form className="veritcalform" onSubmit={handleSubmit}>
						<TextField
							type="text"
							label="First Name"
							ref={firstNameRef}
							defaultValue={dbUser && dbUser.firstName}
						/>
						<TextField
							type="text"
							label="Last Name"
							ref={lastNameRef}
							defaultValue={dbUser && dbUser.lastName}
						/>
						<TextField
							required
							type="email"
							// label="Email"
							ref={emailRef}
							defaultValue={currentUser.email}
						/>
						<TextField
							type="password"
							// label="Password"
							ref={passwordRef}
							placeholder="Leave blank to keep the same"
						/>
						<TextField
							type="password"
							// label="Confirm Password"
							ref={passwordConfirmRef}
							placeholder="Leave blank to keep the same"
						/>
						<Button type="submit" disabled={loading}>
							Update Profile
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
