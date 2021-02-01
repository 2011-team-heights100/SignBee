import React from "react";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { Dialog, DialogTitle, List, ListItem, ListItemText, ListItemAvatar, Avatar } from "@material-ui/core";

//this does not open. Need to add toggle functionality.
export default function ProfileSummary() {
	return (
		<Dialog>
			<DialogTitle>Hey there, Cody!</DialogTitle>
         <div>LIVES</div>
         <div>LEVEL</div>
         <div>STREAK</div>
         <List>
            <ListItem button onClick={()=>{}} key="updateProfile">
               <ListItemAvatar>
                  <Avatar>
                     <PersonOutlineIcon />
                  </Avatar>
               </ListItemAvatar>
               <ListItemText primary="Edit Account Info" />
            </ListItem>
         </List>
		</Dialog>
	);
}
