import React, { useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { useHistory } from 'react-router-dom';
import {
	Dialog,
	DialogTitle,
	List,
	ListItem,
	ListItemText,
	Button,
	Typography,
} from "@material-ui/core";

export default function SectionModal({name, show}) {
	const { dbUser, getDbUser, levels, getLevels, setCurrentLevel } = useUser();
	const history = useHistory();
	let levelsCompleted = 0;

	useEffect(() => {
		getDbUser();
		getLevels();
	}, []);

	if (dbUser) {
		let progress = dbUser.progress[name];
		for (let key in progress) {
			if (progress[key] === true) levelsCompleted++;
		};
	};

	function handleClick () {
		setCurrentLevel(levels[name]);
		history.push('/app');
	}

	return (
		<Dialog open={show}>
			<DialogTitle>
				<Typography variant="h2">{name}</Typography>
			</DialogTitle>
			<List>
				<ListItem>
					<ListItemText primary="Lives" />
				</ListItem>
				<ListItem>
					<ListItemText primary="Levels" />
					<ListItemText primary={levelsCompleted + "/3"} />
				</ListItem>
			</List>
			<Button onClick={() => handleClick()}>Begin</Button>
		</Dialog>
	);
}
