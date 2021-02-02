import React from 'react'
import {
	Dialog,
	DialogTitle,
	List,
	ListItem,
   ListItemText,
   Button
} from "@material-ui/core";

export default function SectionModal() {
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
