import React, { useState } from 'react';
import SectionModal from './SectionModal';


function HoneyComb ({name, rounds}) {
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
				<SectionModal name={name} rounds={rounds} show={showModal} />
			</div>
		</div>
	);
}

export default HoneyComb

