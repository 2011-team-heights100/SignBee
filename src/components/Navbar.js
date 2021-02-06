import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AppBar, Grid, Toolbar, IconButton, Button } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from '../contexts/UserContext'
import ProfileSummary from "./ProfileSummary";

export default function Navbar() {
	const { getDbUser } = useUser();
	const { currentUser } = useAuth()
  const [modalShow, setModalShow ] = useState(false)
	const history = useHistory();

	useEffect(() => {
		getDbUser();
	}, [])

  const handleClick = (e) => {
    e.preventDefault();
    setModalShow(!modalShow)
  };

	return (
		<>
			<AppBar position='static' color='transparent' elevation={0}>
				<Toolbar>
					<Grid container justify='space-between'>
						<div></div>
						<Button onClick={() => history.push('/app')}>START</Button>
						{currentUser && (
							<IconButton color='secondary' onClick={handleClick}>
								<AccountCircle />
							</IconButton>
						)}
					</Grid>
				</Toolbar>
			</AppBar>
				<ProfileSummary
					show={modalShow}
					setModalShow={setModalShow}
				/>
		</>
	);
}
