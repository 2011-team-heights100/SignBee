import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import AccountCircle from "@material-ui/icons/AccountCircle";

export default function Navbar() {
	return (
		<>
			<AppBar position="static" color="transparent" >
				<Toolbar>
					<AccountCircle />
				</Toolbar>
			</AppBar>
		</>
	);
}
