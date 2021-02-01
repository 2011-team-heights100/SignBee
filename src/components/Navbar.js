import React from "react";
import {AppBar, Toolbar} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";

import ProfileSummary from "./ProfileSummary"

export default function Navbar() {
	return (
		<>
			<AppBar position="static" color="transparent" >
				<Toolbar>
					<AccountCircle />
				</Toolbar>
			</AppBar>
         <ProfileSummary />
		</>
	);
}
