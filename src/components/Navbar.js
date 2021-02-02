import React from "react";
import { AppBar, Grid, Toolbar, IconButton } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";

import ProfileSummary from "./ProfileSummary";

export default function Navbar() {
   
const handleClick = (e) => {
   this.preventDefault()

}

	return (
		<>
			<AppBar position="static" color="transparent" elevation={0}>
				<Toolbar>
					<Grid container justify="space-between">
                  <div></div>
						<IconButton color="secondary" onClick={handleClick}>
							<AccountCircle />
						</IconButton>
					</Grid>
				</Toolbar>
			</AppBar>
			<ProfileSummary />
		</>
	);
}
