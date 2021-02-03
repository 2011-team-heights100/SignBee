import React from 'react'
import { useAuth } from "../contexts/AuthContext";
import {
	Dialog,
	DialogTitle,
	List,
	ListItem,
   ListItemText,
   Button
} from "@material-ui/core";

export default function SectionModal() {
   const { dbUser, currentUser } = useAuth();
   
   return (
			<Dialog>
				<DialogTitle>ABCD LEVEL</DialogTitle>
				<List>
					<ListItem>
						<ListItemText primary="Lives" />
					</ListItem>
					<ListItem >
						<ListItemText primary="Levels" />
					</ListItem>
				</List>
            <Button>Begin</Button>
			</Dialog>
		);
}
