import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
	Dialog,
	DialogTitle,
	List,
	ListItem,
	ListItemText,
	Button,
	Typography,
} from "@material-ui/core";

export default function SectionModal(props) {
	const history = useHistory();
	const { dbUser } = useAuth();
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
			<DialogTitle>
				<Typography variant="h2">LEARN</Typography>
			</DialogTitle>
			<List>
				<ListItem>
					<ListItemText primary={dbUser.poits} />
				</ListItem>
				<ListItem>
					<ListItemText primary="Levels" />
				</ListItem>
			</List>
			<Button onClick={() => history.push("/app")}>Begin</Button>
		</Dialog>
	);
}
