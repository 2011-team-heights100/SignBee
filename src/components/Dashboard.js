import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from '../firebase';
import HoneyComb from './HoneyComb';

export default function Dashboard() {
  const {dbUser, currentUser} = useAuth()
	const sectionsRef = db.collection('Sections')
	const [levels, setLevels] = useState({})

	useEffect(async () => {
		const getLevels = {}
		const snapshot = await sectionsRef.get().then((snapshot) => {
			// console.log(snapshot.data())
			snapshot.docs.forEach((doc) => {
				console.log('doc', doc.data())
				// getLevels.push(doc.data())
				const section = doc.data()
				getLevels[section.name] = section.levels
			})
		})
		setLevels(getLevels)
		console.log('snapshot', snapshot)
		console.log('getLevels', getLevels)
	}, [dbUser])
   console.log('levels', levels)
   
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
				<HoneyComb name='ABCD' rounds={levels['A-D']} />
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
