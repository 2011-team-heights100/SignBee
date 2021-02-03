import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import {
	Dialog,
	DialogTitle,
	List,
	ListItem,
	ListItemText,
	Typography,
	ListItemAvatar,
	Avatar,
} from "@material-ui/core";

//this does not open. Need to add toggle functionality.
export default function ProfileSummary(props) {
	const history = useHistory();
	const { dbUser, signout } = useAuth();

	return (
		<Dialog open={props.show}>
			<DialogTitle>Hey there, {dbUser && dbUser.firstName}!</DialogTitle>
			<div className="center-modal">
				<Typography>LIVES</Typography>
				<Typography>LEVEL</Typography>
				<Typography>STREAK</Typography>
			</div>

			<List>
				<ListItem
					button
					onClick={() => {
						history.push("/updateprofile");
					}}
					key="updateProfile"
				>
					<ListItemAvatar>
						<Avatar>
							<PersonOutlineIcon color="secondary" />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="Edit Account Info" />
				</ListItem>
				<ListItem button onClick={signout} key="updateProfile">
					<ListItemAvatar>
						<Avatar>
							<IndeterminateCheckBoxIcon color="secondary" />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="Sign Out" />
				</ListItem>
			</List>
		</Dialog>
	);
}
