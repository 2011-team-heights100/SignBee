import React, { useState, useEffect } from "react";
import { AppBar, Grid, Toolbar, IconButton } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import ProfileSummary from "./ProfileSummary";

export default function Navbar() {
	const { getDbUser } = useUser();
	const { currentUser } = useAuth();
	const [modalShow, setModalShow] = useState(false);

	useEffect(() => {
		getDbUser();
	}, []);

	const handleClick = (e) => {
		e.preventDefault();
		setModalShow(!modalShow);
	};

	const showNavIcon =
		window.location.pathname !== "/learn" &&
		window.location.pathname !== "/app";

	return (
		<>
			<AppBar position="static" color="transparent" elevation={0}>
				<Toolbar>
					<Grid container justify="space-between">
						<div></div>
						{currentUser && (
							<IconButton color="secondary" onClick={handleClick}>
								{showNavIcon && <AccountCircle style={{ fontSize: 40 }} />}
							</IconButton>
						)}
					</Grid>
				</Toolbar>
			</AppBar>
			<ProfileSummary show={modalShow} setModalShow={setModalShow} />
		</>
	);
}
