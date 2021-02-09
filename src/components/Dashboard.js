import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import HoneyComb from "./HoneyComb";
import { useUser } from "../contexts/UserContext";
import { HelpSharp } from "@material-ui/icons";
import { slideInUp, shake, pulse } from "react-animations";
import styled, { keyframes } from "styled-components";

const Slide = styled.div`
	animation: 1s ${keyframes`${slideInUp}`};
`;

const Shake = styled.div`
	animation: 2s ${keyframes`${pulse}`} infinite;
`;

export default function Dashboard() {
	document.body.style = "background: #FEF5E4";

	const { levels, getDbUser, setCurrentLevel } = useUser();
  // const history = useHistory();
  
	// // const handleClick = async (e) => {
	// // 	e.preventDefault();
  // //   await setCurrentLevel(levels.LEARN);
  // //   history.push("/learn")
	// // };

	useEffect(() => {
    getDbUser();
	}, []);

	return (
		<div id="hexGrid">
			<div className="row">
				<HoneyComb name="LEARN" />
			</div>
			<div className="row">
				<HoneyComb name="ABCD" />
				<HoneyComb name="EFGH" />
			</div>
			<div className="row">
				<HoneyComb name="IJKL" />
				<HoneyComb name="MNOP" />
				<HoneyComb name="QRST" />
			</div>
			<div className="row">
				<HoneyComb name="UVW" />
				<HoneyComb name="XYZ" />
			</div>
			<div className="row">
				<Slide>
					<img
						src={process.env.PUBLIC_URL + "/signbee_logo.svg"}
						id="bee-logo-dash"
						alt="beeLogo"
					/>
				</Slide>
			</div>
			<div id="info">
				<Shake>
					<HelpSharp color="secondary" style={{ fontSize: 40 }}></HelpSharp>
				</Shake>
			</div>
		</div>
	);
}
