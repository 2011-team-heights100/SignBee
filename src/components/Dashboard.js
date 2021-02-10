import React, { useEffect, useState } from "react";
import HoneyComb from "./HoneyComb";
import { useUser } from "../contexts/UserContext";
import { HelpSharp } from "@material-ui/icons";
import { slideInUp, pulse } from "react-animations";
import styled, { keyframes } from "styled-components";
import InfoModal from "./InfoModal";

const Slide = styled.div`
	animation: 1s ${keyframes`${slideInUp}`};
`;

const Pulse = styled.div`
	animation: 2s ${keyframes`${pulse}`} infinite;
`;

export default function Dashboard() {
	document.body.style = "background: #FEF5E4";

	const { getDbUser } = useUser();
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		getDbUser();
	}, []);

	const handleClick = (e) => {
		e.preventDefault();
		setShowModal(!showModal);
	};

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
				<Pulse>
					<HelpSharp
						color="secondary"
						style={{ fontSize: 40 }}
						onClick={handleClick}
					></HelpSharp>
					<InfoModal show={showModal} />
				</Pulse>
			</div>
		</div>
	);
}
