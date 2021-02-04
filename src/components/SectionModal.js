import React, { useRef } from 'react'
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from 'react-router-dom';
import {
	Dialog,
	DialogTitle,
	List,
	ListItem,
   ListItemText,
	Button,
	 Typography
} from "@material-ui/core";

export default function SectionModal({rounds, show}) {
  const { dbUser, currentUser } = useAuth();
	const { showModal, setShowModal } = useRef(false);
	const history = useHistory();
	console.log('rounds', rounds)
	return (
		<Dialog open={show}>
			<DialogTitle>
				<Typography variant='h2'>LEARN</Typography>
			</DialogTitle>
			<List>
				<ListItem>
					<ListItemText primary='Lives' />
				</ListItem>
				<ListItem>
					<ListItemText primary='Levels' />
					{/* <ListItemText primary={rounds.entries().length} /> */}
					<ListItemText primary={rounds && '\n' + Object.keys(rounds).length} />
				</ListItem>
			</List>
			<Button onClick={() => history.push('/app')}>Begin</Button>
		</Dialog>
	);
}
