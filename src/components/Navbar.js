import React, { useState } from "react";
import { AppBar, Grid, Toolbar, IconButton } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useAuth } from "../contexts/AuthContext";
import ProfileSummary from "./ProfileSummary";

export default function Navbar() {
	const { currentUser } = useAuth();
	const [modalShow, setModalShow] = useState(false);


	const handleClick = (e) => {
		e.preventDefault();
		setModalShow(!modalShow);
	};

	const showNavIcon =
		window.location.pathname !== "/learn" &&
		window.location.pathname !== "/app";

	return (
		<>
			<AppBar position='static' color='transparent' elevation={0}>
				<Toolbar>
					<Grid container justify='space-between'>
						<div></div>
						{currentUser && (
							<IconButton id='userIcon' aria-label='user account menu' color='secondary' onClick={handleClick}>
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
