import React, { useState, useEffect } from 'react';
import Translator from '../../common/Translator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

function Time({GlobalState, selectedDate, setSelectedDate}) {
  const {
		currentDate,
    pickupDate, setPickupDate,
    returnDate, setReturnDate,
    language,
  } = GlobalState;

	const [disableIncreaseHour, setDisableIncreaseHour] = useState(selectedDate.getHours() == 23);
	const [disableDecreaseHour, setDisableDecreaseHour] = useState(selectedDate.getHours() == 0 || currentDate >= selectedDate);
	const [disableIncreaseMinutes, setDisableIncreaseMinutes] = useState(selectedDate.getMinutes() == 50);
	const [disableDecreaseMinutes, setDisableDecreaseMinutes] = useState(selectedDate.getMinutes() == 0 || currentDate >= selectedDate);

	useEffect(() => {
    if (returnDate != null){
      const returnDatePlus = new Date(returnDate);
      returnDatePlus.setHours(returnDatePlus.getHours() - 1);
      // returnDatePlus.setMinutes(returnDatePlus.getMinutes() - 30);
  
      const pickupDatePlus = new Date(pickupDate);
      pickupDatePlus.setHours(pickupDatePlus.getHours() + 1);
      // pickupDatePlus.setMinutes(pickupDatePlus.getMinutes() + 30);
  
      if (pickupDate > returnDatePlus){
        setReturnDate(pickupDatePlus);
      }
    }

		if (pickupDate < currentDate){
			setPickupDate(currentDate);
		}
  }, [pickupDate]);

  useEffect(() => {
    if (returnDate != null){
      const returnDateMinus = new Date(returnDate);
      returnDateMinus.setHours(returnDateMinus.getHours() - 1);
      // returnDateMinus.setMinutes(returnDateMinus.getMinutes() - 30);
  
      const pickupDateMinus = new Date(pickupDate);
      pickupDateMinus.setHours(pickupDateMinus.getHours() + 1);
      // pickupDateMinus.setMinutes(pickupDateMinus.getMinutes() + 30);

			if (returnDate <= currentDate){
				setPickupDate(currentDate);
			}else if (returnDate < pickupDateMinus){
				setPickupDate(returnDateMinus);
			}
    }
  }, [returnDate]);

	useEffect(() => {
		updateDisabledKeys();
  }, [selectedDate]);

	const handleFormClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
  };

	const handleIncreaseHour = () => {
		var tempDate = new Date(selectedDate);
		tempDate.setHours(tempDate.getHours() + 1);

		if (selectedDate.getDate() == tempDate.getDate()){
			setSelectedDate(tempDate);
		}
  };

	const handleDecreaseHour = () => {
		var tempDate = new Date(selectedDate);
		tempDate.setHours(tempDate.getHours() - 1);

		if (tempDate >= currentDate && selectedDate.getDate() == tempDate.getDate() && (getMinuteDifference(tempDate, pickupDate) >= 60 || returnDate != selectedDate)){
			setSelectedDate(tempDate);
		}
  };

	const handleIncreaseMinutes = () => {
		var tempDate = new Date(selectedDate);
		tempDate.setMinutes(tempDate.getMinutes() + 10);

		if (selectedDate.getHours() == tempDate.getHours()){
			setSelectedDate(tempDate);
		}
  };

	const handleDecreaseMinutes = () => {
		var tempDate = new Date(selectedDate);
		tempDate.setMinutes(tempDate.getMinutes() - 10);

		if (tempDate >= currentDate && selectedDate.getHours() == tempDate.getHours() && (getMinuteDifference(tempDate, pickupDate) >= 60 || returnDate != selectedDate)){
			setSelectedDate(tempDate);
		}
  };

	function getMinuteDifference(date1, date2) {
		if (date1 == null || date2 == null){
			return 1000;
		}
    // Convert both dates to milliseconds
    const date1Milliseconds = date1.getTime();
    const date2Milliseconds = date2.getTime();
    // Find the difference in milliseconds
    const differenceMilliseconds = Math.abs(date1Milliseconds - date2Milliseconds);
    // Convert the difference to minutes
    const differenceMinutes = Math.floor(differenceMilliseconds / (1000 * 60))
    return differenceMinutes;
	}

	function updateDisabledKeys(){
		//HOUR +1
		var tempDate = new Date(selectedDate);
		tempDate.setHours(tempDate.getHours() + 1);

		if (tempDate.getDate() == selectedDate.getDate() && tempDate >= currentDate){
			setDisableIncreaseHour(false);
		}else{
			setDisableIncreaseHour(true);
		}

		//HOUR -1
		tempDate = new Date(selectedDate);
		tempDate.setHours(tempDate.getHours() - 1);

		if (tempDate.getDate() == selectedDate.getDate() && tempDate >= currentDate && (getMinuteDifference(tempDate, pickupDate) >= 60 || returnDate != selectedDate)){
			setDisableDecreaseHour(false);
		}else{
			setDisableDecreaseHour(true);
		}

		//MINUTES +10
		tempDate = new Date(selectedDate);
		tempDate.setMinutes(tempDate.getMinutes() + 10);

		if (tempDate.getHours() == selectedDate.getHours() && tempDate >= currentDate){
			setDisableIncreaseMinutes(false);
		}else{
			setDisableIncreaseMinutes(true);
		}

		//MINUTES -10
		tempDate = new Date(selectedDate);
		tempDate.setMinutes(tempDate.getMinutes() - 10);

		if (tempDate.getHours() == selectedDate.getHours() && tempDate >= currentDate && (getMinuteDifference(tempDate, pickupDate) >= 60 || returnDate != selectedDate)){
			setDisableDecreaseMinutes(false);
		}else{
			setDisableDecreaseMinutes(true);
		}
	}

  return (
    <>
			<div className='time-form' onClick={handleFormClick}>
				<div>
					{selectedDate.getHours().toString().padStart(2, '0')}
				</div>
				<div className='arrows'>
					<FontAwesomeIcon icon={faChevronUp} className={`${disableIncreaseHour && 'disabled'}`} onClick={handleIncreaseHour}/>
					<FontAwesomeIcon icon={faChevronDown} className={`${disableDecreaseHour && 'disabled'}`} onClick={handleDecreaseHour}/>
				</div>
				<div>
					{`:`}
				</div>
				<div>
					{selectedDate.getMinutes().toString().padStart(2, '0')}
				</div>
				<div className='arrows'>
					<FontAwesomeIcon icon={faChevronUp} className={`${disableIncreaseMinutes && 'disabled'}`} onClick={handleIncreaseMinutes}/>
					<FontAwesomeIcon icon={faChevronDown} className={`${disableDecreaseMinutes && 'disabled'}`} onClick={handleDecreaseMinutes}/>
				</div>
			</div>
    </>
  )
}

export default Time
  