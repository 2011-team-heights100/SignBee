import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from '../contexts/UserContext'

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

export default function ProfileSummary ({show, setModalShow}) {
	const history = useHistory();
	const { dbUser,  } = useUser();
	const { signout } = useAuth()
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setOpen(show);
	}, [show]);

	const handleClickAway = () => {
		setModalShow(false)
		setOpen(false);
  };
  
  let progress = 0
  let totalProgress = 0

  for(let section in dbUser.progress){
    for (let level in dbUser.progress[section]) {
			totalProgress++;
			if (dbUser.progress[section][level]) progress++;
		}
  }

	return (
		<>
			<Dialog
				open={open}
				onBackdropClick={handleClickAway}
				closeAfterTransition={true}
			>
				<DialogTitle align="center">
					Hey there, {dbUser && dbUser.firstName}!
				</DialogTitle>
				<div className="center-modal">
					<Typography variant="h2">STATS</Typography>
					<Typography variant="h5">LEVELS COMPLETE</Typography>
					<Typography
						variant="h2"
						color="primary"
					>{`${progress} / ${totalProgress}`}</Typography>
					<br />
					<Typography variant="h5">TOTAL POINTS</Typography>
					<Typography variant="h2" color="primary">
						{dbUser.points}
					</Typography>
					{/* <Typography variant="h5">STREAK</Typography> */}
				</div>

				<List>
					<ListItem
						button
						onClick={() => {
							setOpen(false);
							setModalShow(false);
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
							setOpen(false);
							setModalShow(false);
							signout();
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
		</>
	);
}
