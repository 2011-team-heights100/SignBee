import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useHistory } from 'react-router-dom';
import {
	Dialog,
	List,
	ListItem,
	ListItemText,
	Button,
	Typography,
} from "@material-ui/core";

export default function SectionModal({name, show}) {
  const { dbUser, getDbUser, levels, getLevels, currentLevel, setCurrentLevel } = useUser();
  const [difficulty, setDifficulty] = useState(null);
	const history = useHistory();
	let levelsCompleted = 0;

	useEffect(() => {
		getDbUser();
    getLevels();
    // defineDifficulty();
	}, []);

	if (dbUser) {
		let progress = dbUser.progress[name];
		for (let key in progress) {
			if (progress[key] === true) levelsCompleted++;
		};
  };
  
  const defineDifficulty = (currentLevelName) => {
		if (
			!dbUser.progress.currentLevelName.easy &&
			!dbUser.progress.currentLevelName.medium &&
			!dbUser.progress.currentLevelName.medium
		) {
			setDifficulty("easy");
		} else if (
			dbUser.progress.currentLevelName.easy &&
			!dbUser.progress.currentLevelName.medium &&
			!dbUser.progress.currentLevelName.medium
		) {
			setDifficulty("mdium");
		} else if (
			dbUser.progress.currentLevelName.easy &&
			dbUser.progress.currentLevelName.medium &&
			!dbUser.progress.currentLevelName.medium
		) {
			setDifficulty("hard");
		}
	};

	async function handleClick () {
    await defineDifficulty(name)
    await setCurrentLevel(levels[name]);
    console.log("currentLevel", currentLevel)
    console.log("difficulty", difficulty);
		history.push("/app");
	}

	return (
		<Dialog open={show}>
				<Typography variant="h2" align="center">{name}</Typography>
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
