import React, { useEffect, useState } from "react";
import {
	Dialog,
	List,
	ListItem,
	ListItemText,
	Typography,
} from "@material-ui/core";

export default function InfoModal({ show }) {
	const [open, setOpen] = useState(show);

  useEffect(() => {
		setOpen(show);
	}, [show]);
  
  const handleClickAway = () => {
		setOpen(false);
	};
	

	return (
		<Dialog open={open} onBackdropClick={handleClickAway}>
			<Typography variant="h2" align="center">
				INFO
			</Typography>
			<List>
				<Typography variant="h5">Get Started</Typography>
				<Typography variant="h6">
					Learn American Sign Language letters through the "LEARN" section.
				</Typography>
				<br />
				<Typography variant="h5">PRACTICE</Typography>
				<Typography variant="h6">
					Tap on any honeycomb to begin practicing those letters!
				</Typography>
				<br />
				<Typography variant="h6">
					Difficulty will increase with each level, and you will not be able to move on to the next level until you get all the gestures correctly.
				</Typography>
			</List>
		</Dialog>
	);
}
