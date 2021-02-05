import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from '../firebase';
import HoneyComb from './HoneyComb';
import { useUser } from '../contexts/UserContext';
import { Grid } from "@material-ui/core";

export default function Dashboard () {
	const { dbUser, getDbUser } = useUser();
  const { currentUser} = useAuth()
	const sectionsRef = db.collection('Sections')
	const [levels, setLevels] = useState({})
	const getLevels = {}

	useEffect(() => {
		getDbUser();
	}, []);
	// useEffect(() => {
	// 	async function fetchData () {
	// 		await sectionsRef.get().then((snapshot) => {
	// 			snapshot.docs.forEach((doc) => {
	// 				const section = doc.data()
	// 				console.log(section)
	// 				getLevels[section.name] = section.levels
	// 				// console.log(getLevels)
	// 				setLevels(getLevels)
	// 			})
	// 		})
	// 	}
	// 	fetchData()
	// }, [currentUser])
	// console.log('levels', levels)
	// console.log('currentUser', currentUser)
	// console.log('dbuser', dbUser)

	return (
			<div id="hexGrid">
				<div className="row">
					<div className="hexagon hexagon-with-border warning">
						<div className="hexagon-shape">
							<div className="hexagon-shape-inner">
								<div className="hexagon-shape-inner-2"></div>
							</div>
						</div>
						<div className="hexagon-shape content-panel">
							<div className="hexagon-shape-inner">
								<div className="hexagon-shape-inner-2"></div>
							</div>
						</div>
						<div className="hexagon-content">
							<div className="content-title">LEARN</div>
						</div>
					</div>
				</div>
				<div className="row">
					<HoneyComb name="ABCD" rounds={levels["A-D"]} />
					{/* <div className="hexagon hexagon-with-border warning">
					<div className="hexagon-shape">
						<div className="hexagon-shape-inner">
							<div className="hexagon-shape-inner-2"></div>
						</div>
					</div>
					<div className="hexagon-shape content-panel">
						<div className="hexagon-shape-inner">
							<div className="hexagon-shape-inner-2"></div>
						</div>
					</div>
					<div className="hexagon-content" >
						<div className="content-title">ABCD</div>
					</div>
				</div> */}
					<div className="hexagon hexagon-with-border warning">
						<div className="hexagon-shape">
							<div className="hexagon-shape-inner">
								<div className="hexagon-shape-inner-2"></div>
							</div>
						</div>
						<div className="hexagon-shape content-panel">
							{/* <div className="hexagon-shape-inner">
							<div className="hexagon-shape-inner-2"></div>
						</div> */}
						</div>
						<div className="hexagon-content">
							<div className="content-title">EFGH</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="hexagon hexagon-with-border warning">
						<div className="hexagon-shape">
							<div className="hexagon-shape-inner">
								<div className="hexagon-shape-inner-2"></div>
							</div>
						</div>
						<div className="hexagon-shape content-panel">
							<div className="hexagon-shape-inner">
								<div className="hexagon-shape-inner-2"></div>
							</div>
						</div>
						<div className="hexagon-content">
							<div className="content-title">IJKL</div>
						</div>
					</div>
					<div className="hexagon hexagon-with-border warning">
						<div className="hexagon-shape">
							<div className="hexagon-shape-inner">
								<div className="hexagon-shape-inner-2"></div>
							</div>
						</div>
						<div className="hexagon-shape content-panel">
							<div className="hexagon-shape-inner">
								<div className="hexagon-shape-inner-2"></div>
							</div>
						</div>
						<div className="hexagon-content">
							<div className="content-title">MNOP</div>
						</div>
					</div>
					<div className="hexagon hexagon-with-border warning">
						<div className="hexagon-shape">
							<div className="hexagon-shape-inner">
								<div className="hexagon-shape-inner-2"></div>
							</div>
						</div>
						<div className="hexagon-shape content-panel">
							<div className="hexagon-shape-inner">
								<div className="hexagon-shape-inner-2"></div>
							</div>
						</div>
						<div className="hexagon-content">
							<div className="content-title">QRST</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="hexagon hexagon-with-border warning">
						<div className="hexagon-shape">
							<div className="hexagon-shape-inner">
								<div className="hexagon-shape-inner-2"></div>
							</div>
						</div>
						<div className="hexagon-shape content-panel">
							<div className="hexagon-shape-inner">
								<div className="hexagon-shape-inner-2"></div>
							</div>
						</div>
						<div className="hexagon-content">
							<div className="content-title">UVW</div>
						</div>
					</div>
					<div className="hexagon hexagon-with-border warning">
						<div className="hexagon-shape">
							<div className="hexagon-shape-inner">
								<div className="hexagon-shape-inner-2"></div>
							</div>
						</div>
						<div className="hexagon-shape content-panel">
							<div className="hexagon-shape-inner">
								<div className="hexagon-shape-inner-2"></div>
							</div>
						</div>
						<div className="hexagon-content">
							<div className="content-title">XYZ</div>
						</div>
					</div>
				</div>
			</div>
	);
}
