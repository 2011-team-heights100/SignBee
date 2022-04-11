import React, { useState } from "react";
import SectionModal from "./SectionModal";
import { useUser } from "../contexts/UserContext";

function HoneyComb({ name }) {
	const { dbUser } = useUser();
	const [showModal, setShowModal] = useState(false);

	let percent;

	if (dbUser) {
		let progress = dbUser.progress[name];
		let levelsCompleted = 0;
		if (progress !== undefined) {
			let totalLevels = Object.keys(progress).length;
			for (let key in progress) {
				if (progress[key] === true) levelsCompleted++;
			}
			percent = Number(levelsCompleted / totalLevels);
		}
	}

	const handleClick = (e) => {
		e.preventDefault();
		setShowModal(!showModal);
	};

	return (
		<div className="hexagon hexagon-with-border warning" onClick={handleClick}>
			<div className="hexagon-shape">
				<div className="hexagon-shape-inner">
					<div className="hexagon-shape-inner-2"></div>
				</div>
			</div>
			{percent < 1 && (
				<div className="hexagon-shape content-panel">
					<div className="hexagon-shape-inner">
						<div className="hexagon-shape-inner-2"></div>
					</div>
				</div>
			)}
			{percent > 0 && percent < 1 && (
				<div className="hexagon-shape content-panel-some-action">
					<div className="hexagon-shape-inner">
						<div className="hexagon-shape-inner-2"></div>
					</div>
				</div>
			)}
			<div className="hexagon-content">
				<div className="content-title">{name}</div>
          <SectionModal show={showModal} name={name} />
			</div>
		</div>
	);
}

export default HoneyComb;
