import React, { useState } from 'react';
import SectionModal from './SectionModal';


function HoneyComb ({name}) {
	const [showModal, setShowModal] = useState(false)

  const handleClick = (e) => {
      e.preventDefault();
			setShowModal(!showModal);
  }

  return (
		<div className='hexagon hexagon-with-border warning' onClick={handleClick}>
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
				<div className='content-title'>{name}</div>
				<SectionModal show={showModal} name={name} />
			</div>
		</div>
	);
}

export default HoneyComb

