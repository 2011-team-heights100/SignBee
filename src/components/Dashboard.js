import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from '../firebase';
import HoneyComb from './HoneyComb';
import { useUser } from '../contexts/UserContext';

export default function Dashboard () {
	const { dbUser, getDbUser, levels, getLevels } = useUser();
  const { currentUser} = useAuth()

	useEffect(() => {
		getDbUser();
		getLevels();
		// getUserProgress()
	}, []);

console.log('user', levels)
	return (
		<div id='hexGrid'>
			<div className='row'>
				<div className='hexagon hexagon-with-border warning'>
					<div className='hexagon-shape'>
						<div className='hexagon-shape-inner'>
							<div className='hexagon-shape-inner-2'></div>
						</div>
					</div>
					<div className='hexagon-shape content-panel'>
						<div className='hexagon-shape-inner'>
							<div className='hexagon-shape-inner-2'></div>
						</div>
					</div>
					<div className='hexagon-content'>
						<div className='content-title'>LEARN</div>
					</div>
				</div>
			</div>
			<div className='row'>
				<HoneyComb name='ABCD' rounds={levels['ABCD']} />
				<HoneyComb name='EFGH' rounds={levels['EFGH']} />
			</div>
			<div className='row'>
				<div className='hexagon hexagon-with-border warning'>
					<div className='hexagon-shape'>
						<div className='hexagon-shape-inner'>
							<div className='hexagon-shape-inner-2'></div>
						</div>
					</div>
					<div className='hexagon-shape content-panel'>
						<div className='hexagon-shape-inner'>
							<div className='hexagon-shape-inner-2'></div>
						</div>
					</div>
					<div className='hexagon-content'>
						<div className='content-title'>IJKL</div>
					</div>
				</div>
				<div className='hexagon hexagon-with-border warning'>
					<div className='hexagon-shape'>
						<div className='hexagon-shape-inner'>
							<div className='hexagon-shape-inner-2'></div>
						</div>
					</div>
					<div className='hexagon-shape content-panel'>
						<div className='hexagon-shape-inner'>
							<div className='hexagon-shape-inner-2'></div>
						</div>
					</div>
					<div className='hexagon-content'>
						<div className='content-title'>MNOP</div>
					</div>
				</div>
				<div className='hexagon hexagon-with-border warning'>
					<div className='hexagon-shape'>
						<div className='hexagon-shape-inner'>
							<div className='hexagon-shape-inner-2'></div>
						</div>
					</div>
					<div className='hexagon-shape content-panel'>
						<div className='hexagon-shape-inner'>
							<div className='hexagon-shape-inner-2'></div>
						</div>
					</div>
					<div className='hexagon-content'>
						<div className='content-title'>QRST</div>
					</div>
				</div>
			</div>
			<div className='row'>
				<div className='hexagon hexagon-with-border warning'>
					<div className='hexagon-shape'>
						<div className='hexagon-shape-inner'>
							<div className='hexagon-shape-inner-2'></div>
						</div>
					</div>
					<div className='hexagon-shape content-panel'>
						<div className='hexagon-shape-inner'>
							<div className='hexagon-shape-inner-2'></div>
						</div>
					</div>
					<div className='hexagon-content'>
						<div className='content-title'>UVW</div>
					</div>
				</div>
				<div className='hexagon hexagon-with-border warning'>
					<div className='hexagon-shape'>
						<div className='hexagon-shape-inner'>
							<div className='hexagon-shape-inner-2'></div>
						</div>
					</div>
					<div className='hexagon-shape content-panel'>
						<div className='hexagon-shape-inner'>
							<div className='hexagon-shape-inner-2'></div>
						</div>
					</div>
					<div className='hexagon-content'>
						<div className='content-title'>XYZ</div>
					</div>
				</div>
			</div>
		</div>
	);
}
