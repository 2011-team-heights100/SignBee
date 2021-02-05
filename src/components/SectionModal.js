import React, { useRef, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { useAuth } from '../contexts/AuthContext';
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

export default function SectionModal({name, rounds, show}) {
	const { dbUser, getDbUser } = useUser();
	const history = useHistory();
	let levelsCompleted = 0;

	useEffect(() => {
		getDbUser();
	}, [])

	if (dbUser) {
		let progress = dbUser.progress[name]
		for (let key in progress) {
			if (progress[key] === true) levelsCompleted++
		}
	}

	return (
		<Dialog open={show}>
			<DialogTitle>
				<Typography variant='h2'>{name}</Typography>
			</DialogTitle>
			<List>
				<ListItem>
					<ListItemText primary='Lives' />
				</ListItem>
				<ListItem>
					<ListItemText primary='Levels' />
					<ListItemText primary={levelsCompleted + '/3'} />
				</ListItem>
			</List>
			<Button onClick={() => history.push('/app')}>Begin</Button>
		</Dialog>
	);
}
