import React, { useEffect } from "react";
import HoneyComb from './HoneyComb';
import { useUser } from '../contexts/UserContext';

export default function Dashboard () {
	const { getDbUser, levels, getLevels } = useUser();

	useEffect(() => {
		getDbUser();
		getLevels();
	}, []);

	return (
		<div id='hexGrid'>
			<div className='row'>
				<HoneyComb name='LEARN' rounds={levels['learn']} />
			</div>
			<div className='row'>
				<HoneyComb name='ABCD' rounds={levels['ABCD']} />
				<HoneyComb name='EFGH' rounds={levels['EFGH']} />
			</div>
			<div className='row'>
				<HoneyComb name='IJKL' rounds={levels['IJKL']} />
				<HoneyComb name='MNOP' rounds={levels['MNOP']} />
				<HoneyComb name='QRST' rounds={levels['QRST']} />
			</div>
			<div className='row'>
				<HoneyComb name='UVW' rounds={levels['UVW']} />
				<HoneyComb name='XYZ' rounds={levels['XYZ']} />
			</div>
		</div>
	);
}
