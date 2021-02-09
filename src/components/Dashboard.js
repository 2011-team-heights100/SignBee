import React, { useEffect } from "react";
import HoneyComb from "./HoneyComb";
import { useUser } from "../contexts/UserContext";
import { slideInUp } from "react-animations";
import styled, { keyframes } from "styled-components";

const Slide = styled.div`
	animation: 1s ${keyframes`${slideInUp}`};
`;

export default function Dashboard() {
	document.body.style = "background: #FEF5E4";

	const { getDbUser } = useUser();

	useEffect(() => {
		return getDbUser();
  }, []);

	return (
		<div id="hexGrid">
			<div className="row">
          <HoneyComb name="LEARN"/>
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
		</div>
	);
}
