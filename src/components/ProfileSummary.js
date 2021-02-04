import React, { useEffect, useState } from "react";
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

export default function ProfileSummary(props) {
	const history = useHistory();
	const { dbUser, signout } = useAuth();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setOpen(props.show);
	}, [props.show]);

	const handleClickAway = () => {
		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			onBackdropClick={handleClickAway}
			closeAfterTransition={true}
		>
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
						setOpen(false);
						history.push("/updateprofile");
					}}
				>
					<ListItemAvatar>
						<Avatar>
							<PersonOutlineIcon color="secondary" />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="Edit Account Info" />
				</ListItem>
				<ListItem
					button
					onClick={() => {
						setOpen(false)
						signout()
					}}
				>
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
