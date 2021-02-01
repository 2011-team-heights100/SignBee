import React from "react";

export default function Dashboard() {
	// const sections = [
	// 	{ name: "Learn" },
	// 	{ name: "ABCD" },
	// 	{ name: "EFGH" },
	// 	{ name: "IJKL" },
	// 	{ name: "MNOP" },
	// 	{ name: "QRST" },
	// 	{ name: "UVW" },
	// 	{ name: "XYZ" },
	// ];
	return (
		<div id="hexGrid">
			<div className="row"></div>
			<div className="hexagon">
				<div className="hexIn">LEARN</div>
			</div>
			<div className="row">
				<div className="hexagon">
					<div className="hexIn">ABCD</div>
				</div>
				<div className="hexagon">
					<div className="hexIn">EFGH</div>
				</div>
			</div>
			<div className="row">
				<div className="hexagon">
					<div className="hexIn">IJKL</div>
				</div>
				<div className="hexagon">
					<div className="hexIn">MNOP</div>
				</div>
				<div className="hexagon">
					<div className="hexIn">QRST</div>
				</div>
			</div>
			<div className="row">
				<div className="hexagon">
					<div className="hexIn">UVW</div>
				</div>
				<div className="hexagon">
					<div className="hexIn">XYZ</div>
				</div>
			</div>
		</div>
	);
}
