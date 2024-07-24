import React, { useState, useEffect } from 'react';
import Translator from '../../common/Translator';

function Passengers({GlobalState}) {
  const {
		adults, setAdults,
		children, setChildren,
		infants, setInfants,
    language,
  } = GlobalState;

	const [minAdults] = useState(1);
	const [maxAdults] = useState(8);

	const [minChildren] = useState(0);  
	const [maxChildren] = useState(4); 

	const [minInfants] = useState(0);  
	const [maxInfants] = useState(4); 

	const [maxChildrenInfants] = useState(4); 
	const [maxPassengers] = useState(8); 

	const handleFormClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
  };

	const handleDecreaseAdults = (e) => {
    setAdults(adults - 1);
  };

	const handleIncreaseAdults = (e) => {
    setAdults(adults + 1);
  };

	const handleDecreaseChildren = (e) => {
    setChildren(children - 1);
  };

	const handleIncreaseChildren = (e) => {
    setChildren(children + 1);
  };

	const handleDecreaseInfants = (e) => {
    setInfants(infants - 1);
  };

	const handleIncreaseInfants = (e) => {
    setInfants(infants + 1);
  };
  
  return (
    <>
			<div className='passengers-form' onClick={handleFormClick}>
				<div className='passenger-category'>
					<div className='info'>
						<Translator
							code={language}
							value={`Adults`}
						/>
						<Translator
							code={language}
							value={`+12 years`}
							classNames={`years`}
						/>
					</div>
					<div className='count-adjust'>
						<button 
							onClick={handleDecreaseAdults} 
							disabled={adults <= minAdults}
						>-</button>
						<span>{adults}</span>
						<button 
							onClick={handleIncreaseAdults} 
							disabled={adults >= maxAdults || 
								adults + children + infants >= maxPassengers}
						>+</button>
					</div>
				</div>
				<div className='passenger-category'>
					<div className='info'>
						<Translator
							code={language}
							value={`Children`}
						/>
						<Translator
							code={language}
							value={`2-12 years`}
							classNames={`years`}
						/>
					</div>
					<div className='count-adjust'>
						<button 
							onClick={handleDecreaseChildren} 
							disabled={children <= minChildren}
						>-</button>
						<span>{children}</span>
						<button 
							onClick={handleIncreaseChildren} 
							disabled={children >= maxChildren || 
								children + infants >= maxChildrenInfants || 
								adults + children + infants >= maxPassengers}
						>+</button>
					</div>
				</div>
				<div className='passenger-category'>
					<div className='info'>
						<Translator
							code={language}
							value={`Infants`}
						/>
						<Translator
							code={language}
							value={`0-2 years`}
							classNames={`years`}
						/>
					</div>
					<div className='count-adjust'>
						<button 
							onClick={handleDecreaseInfants} 
							disabled={infants <= minInfants}
						>-</button>
						<span>{infants}</span>
						<button 
							onClick={handleIncreaseInfants} 
							disabled={infants >= maxInfants || 
								children + infants >= maxChildrenInfants || 
								adults + children + infants >= maxPassengers}
						>+</button>
					</div>
				</div>
			</div>
    </>
  )
}

export default Passengers
  