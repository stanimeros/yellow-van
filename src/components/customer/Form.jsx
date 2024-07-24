import React, { useState, useEffect } from 'react';
import Translator from '../common/Translator';
import Section1 from './form/Section1';
import Section2 from './form/Section2';
import Section3 from './form/Section3';
import Summary from './form/Summary';
import Coupons from './form/Coupons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

function Form({GlobalState}) {
  const {
		language, setLanguage,
		theme, setTheme, api
  } = GlobalState;

	const minTimeBefore = 4;
  const athensDate = new Date(new Date().toLocaleString("en-US", {timeZone: "Europe/Athens"}));
  athensDate.setHours(athensDate.getHours() + minTimeBefore);
  let roundedMinutes = Math.round(athensDate.getMinutes() / 10) * 10;
  if (roundedMinutes === 60) {
      athensDate.setHours(athensDate.getHours() + 1);
      roundedMinutes = 0;
  }
  athensDate.setMinutes(roundedMinutes);
  athensDate.setSeconds(0);

  const [currentSection, setCurrentSection] = useState(1);
	const [currentDate] = useState(athensDate);
  const [pickupDate, setPickupDate] = useState(athensDate);
  const [returnDate, setReturnDate] = useState(null);
  const [fromDestinationID, setFromDestinationID] = useState(null);
  const [toDestinationID, setToDestinationID] = useState(null);
  const [fromDestinationDesc, setFromDestinationDesc] = useState(null);
  const [toDestinationDesc, setToDestinationDesc] = useState(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
	
	const FormGlobalState = {
    currentSection, setCurrentSection,
    currentDate,
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
    category, setCategory,
    price, setPrice,
		language, setLanguage,
		theme, setTheme,
		api
	}

	function goBack(section){
		if (section < currentSection){
			setCurrentSection(section);
		}
	}

  return (
    <>
			<h1 className='form-title'>
				<Translator
					language={language}
					value={`Reliable Transfers for Any Destination`}
				/>
			</h1>
    	<div className='booking-form card'>
				<div className='bar'>
					<div className={currentSection > 1 ? `back-button` : ``} onClick={() => goBack(1)}>
						<Translator
							language={language}
							value={`Trip`}
							classNames={currentSection == 1 ? `active` : ``}
						/>
					</div>
					<FontAwesomeIcon icon={faArrowRightLong} />
					<div className={currentSection > 2 ? `back-button` : ``} onClick={() => goBack(2)}>
						<Translator
							language={language}
							value={`Vehicle Category`}
							classNames={currentSection == 2 ? `active` : ``}
						/>
					</div>
					<FontAwesomeIcon icon={faArrowRightLong} />
					<div className={currentSection > 3 ? `back-button` : ``} onClick={() => goBack(3)}>
						<Translator
							language={language}
							value={`Details`}
							classNames={currentSection == 3 ? `active` : ``}
						/>
					</div>
					<FontAwesomeIcon icon={faArrowRightLong} />
					<Translator
						language={language}
						value={`Submit`}
						classNames={currentSection == 4 ? `active` : ``}
					/>
				</div>
				{currentSection == 1 && (
					<Section1
						GlobalState = {FormGlobalState}
					/>
				)}
				{currentSection == 2 && (
					<Section2
						GlobalState = {FormGlobalState}
					/>
				)}
				{currentSection == 3 && (
					<Section3
						GlobalState = {FormGlobalState}
					/>
				)}
			</div>
			<div className='side-cards'>
				{currentSection == 2 && (
					<Coupons
						GlobalState = {FormGlobalState}
					/>
				)}
				<Summary
					GlobalState={FormGlobalState}
				/>
			</div>
    </>
  )
}

export default Form
  