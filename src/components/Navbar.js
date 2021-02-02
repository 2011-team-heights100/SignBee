import React from "react";
import {AppBar, Toolbar, IconButton} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";

import ProfileSummary from "./ProfileSummary"

export default function Navbar() {
	return (
		<>
			<AppBar position="static" color="transparent" elevation={0}>
				<Toolbar>
					<IconButton>
						<AccountCircle />
					</IconButton>
				</Toolbar>
			</AppBar>
			<ProfileSummary />
		</>
	);
}
