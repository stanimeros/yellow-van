import React, { useState, useEffect } from 'react';
import Translator from '../../common/Translator';
import MapComponent from './MapComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faChildren, faBabyCarriage, faRoad, faHourglass, faRepeat, faRightLong} from '@fortawesome/free-solid-svg-icons';
import { faMapPin, faLocationDot, faA, faB, faClock, faTaxi } from '@fortawesome/free-solid-svg-icons';

function Summary({GlobalState}) {
  const {
		currentSection,
    pickupDate, setPickupDate,
    returnDate, setReturnDate,
    fromDestinationID, setFromDestinationID,
    toDestinationID, setToDestinationID,
		fromDestinationDesc, setFromDestinationDesc,
    toDestinationDesc, setToDestinationDesc,
    distance, setDistance,
    duration, setDuration,
    adults, setAdults,
    children, setChildren,
    infants, setInfants,
		category,
    price, setPrice,
		language, setLanguage,
  } = GlobalState;
  
  return (
    <>
			<div className='summary-wrapper card'>
				<div className='summary'>
					<div className='title'>
						<Translator
							language={language}
							value={`Summary`}
						/>
					</div>
					<div className='summary-section'>
						<div>
							<FontAwesomeIcon icon={faUserGroup} />
							<Translator
								language={language}
								value={adults > 1 ? `${adults} Adults` : `${adults} Adult`}
							/>
						</div>
						{children > 0 && (
							<div>
								<FontAwesomeIcon icon={faChildren} />
								<Translator
									language={language}
									value={children > 1 ? `${children} Children` : `${children} Child`}
								/>
							</div>
						)}
						{infants > 0 && (
							<div>
								<FontAwesomeIcon icon={faBabyCarriage} />
								<Translator
									language={language}
									value={infants > 1 ? `${infants} Infants` : `${infants} Infant`}
								/>
							</div>
						)}
					</div>
					<div className='summary-section'>
						<div>
							{returnDate ? (
								<FontAwesomeIcon icon={faRepeat} />
							) : (
								<FontAwesomeIcon icon={faRightLong} />
							)}
							<Translator
								language={language}
								value={returnDate ? `Round trip` : `One way trip`}
							/>
						</div>
						{category && (
							<div>
								<FontAwesomeIcon icon={faTaxi} />
								<Translator
									language={language}
									value={category}
								/>
							</div>
						)}
						{distance && (
							<div>
								<FontAwesomeIcon icon={faRoad} />
								<Translator
									language={language}
									value={distance ? `${distance}` : `0 km` + (returnDate ? ` per trip` : ``)}
								/>	
							</div>
						)}
						{duration && (
							<div>
								<FontAwesomeIcon icon={faHourglass} />
								<Translator
									language={language}
									value={duration ? `${duration}` : `0 min` + (returnDate ? ` per trip` : ``)}
								/>	
							</div>
						)}
						{fromDestinationID && (
							<div>
								<FontAwesomeIcon icon={faA} />
								{fromDestinationDesc}
							</div>
						)}
						{toDestinationID && (
							<div>
								<FontAwesomeIcon icon={faB} />
								{toDestinationDesc}
							</div>
						)}
					</div>
					<div className='summary-section'>
						<div>
							<FontAwesomeIcon icon={faClock} />
							<Translator
								language={language}
								value={`Pickup at ${pickupDate.getHours().toString().padStart(2, '0')}:${pickupDate.getMinutes().toString().padStart(2, '0')}  ${pickupDate.getDate()}/${pickupDate.getMonth() + 1}/${pickupDate.getFullYear()}`}
								/>
						</div>
						{returnDate && (
							<div>
								<FontAwesomeIcon icon={faClock} />
								<Translator
									language={language}
									value={`Return at ${returnDate.getHours().toString().padStart(2, '0')}:${returnDate.getMinutes().toString().padStart(2, '0')}  ${returnDate.getDate()}/${returnDate.getMonth() + 1}/${returnDate.getFullYear()}`}
									/>
							</div>
						)}
					</div>
				</div>
				{currentSection != 2 && (
					<div className='summary-map'>
						<MapComponent
							GlobalState={GlobalState}
						/>
					</div>
				)}
			</div>
    </>
  )
}

export default Summary
  