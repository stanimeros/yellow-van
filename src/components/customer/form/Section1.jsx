import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent';
import Translator from '../../common/Translator';
import Passengers from './Passengers';
import Time from './Time';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin, faLocationDot, faCalendarDays, faClock, faUserGroup, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Calendar from './Calendar';
import SearchPlace from './SearchPlace';

function Section1({GlobalState}) {
  const {
    fromDestinationID, setFromDestinationID, 
    toDestinationID, setToDestinationID,
    fromDestinationDesc, setFromDestinationDesc,
    toDestinationDesc, setToDestinationDesc,
    pickupDate, setPickupDate,
    returnDate, setReturnDate,
    adults, children, infants,
    setCurrentSection, language,
  } = GlobalState;

  const [pickupCalendarIsVisible, setPickupCalendarIsVisible] = useState(false);
  const [returnCalendarIsVisible, setReturnCalendarIsVisible] = useState(false);

  const [pickupTimeIsVisible, setPickupTimeIsVisible] = useState(false);
  const [returnTimeIsVisible, setReturnTimeIsVisible] = useState(false);

  const [passengerFormIsVisible, setPassengerFormIsVisible] = useState(false);
  const [returnInputIsVisible, setReturnInputIsVisible] = useState(returnDate); 

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (passengerFormIsVisible && !e.target.closest('.passengers-input-wrapper')) {
        setPassengerFormIsVisible(false);
      }

      if (pickupCalendarIsVisible && !e.target.closest('.pickup-calendar-wrapper')) {
        setPickupCalendarIsVisible(false);
      }

      if (returnCalendarIsVisible && !e.target.closest('.return-calendar-wrapper')) {
        setReturnCalendarIsVisible(false);
      }

      if (pickupTimeIsVisible && !e.target.closest('.pickup-time-wrapper')) {
        setPickupTimeIsVisible(false);
      }

      if (returnTimeIsVisible && !e.target.closest('.return-time-wrapper')) {
        setReturnTimeIsVisible(false);
      }
    };

    if (passengerFormIsVisible || pickupCalendarIsVisible || returnCalendarIsVisible
        || pickupTimeIsVisible || returnTimeIsVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Remove event listener when component unmounts or when dialog is closed
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [passengerFormIsVisible, pickupCalendarIsVisible, returnCalendarIsVisible,
      pickupTimeIsVisible, returnTimeIsVisible]);

  const handleAddReturnClick = (e) => {
    setReturnInputIsVisible(true);
    const athensDate = new Date(pickupDate);
    athensDate.setHours(athensDate.getHours() + 1); //Minimum time between pickup and return
    setReturnDate(athensDate);
  };

  const handleRemoveReturnClick = (e) => {
    setReturnInputIsVisible(false);
    setReturnDate(null);
  };

  const handleContinueClick = (e) => {
    e.preventDefault();
    if (fromDestinationID == null){
      console.log("From error")
      return;
    }

    if (toDestinationID == null){
      console.log("To error")
      return;
    }

    if (returnDate != null && pickupDate >= returnDate){
      console.log("Dates error")
      return;
    }

    if (adults < 1 || adults + children + infants > 8){
      console.log("Passengers error")
      return;
    }

    setCurrentSection(2);
  };
  
  return (
    <>
			<div className='section section-1'>
        {/* <div className='summary-map'>
          <MapComponent
            GlobalState={GlobalState}
          />
        </div> */}
        <form onSubmit={handleContinueClick}>
          <div className='row'>
            <label htmlFor='from_destination'>
              <FontAwesomeIcon icon={faMapPin} />
              <Translator
                code={language}
                value={`From`}
              />
            </label>
            <div id='from_destination_wrapper'>
              <SearchPlace
                GlobalState={GlobalState}
                setPlaceID={setFromDestinationID}
                placeDesc={fromDestinationDesc}
                setPlaceDesc={setFromDestinationDesc}
              />
            </div>
          </div>
          <div className='row'>
            <label htmlFor='to_destination'>
              <FontAwesomeIcon icon={faLocationDot} />
              <Translator
                code={language}
                value={`To`}
              />
            </label>
            <div id='to_destination_wrapper'>
              <SearchPlace
                GlobalState={GlobalState}
                setPlaceID={setToDestinationID}
                placeDesc={toDestinationDesc}
                setPlaceDesc={setToDestinationDesc}
              />
            </div>
          </div>
          <div className='row'>
            <div className='pickup-calendar-wrapper datetime-input input' onClick={() => {setPickupCalendarIsVisible(!pickupCalendarIsVisible)}}>
              <div className='label'>
                <FontAwesomeIcon icon={faCalendarDays} />
                <Translator
                  code={language}
                  value={`Pickup Date`}
                />
              </div>
              <div>
                {`${pickupDate.getDate().toString().padStart(2, '0')}/${(pickupDate.getMonth() + 1).toString().padStart(2, '0')}/${pickupDate.getFullYear()}`}
              </div>
              {pickupCalendarIsVisible && (
                <Calendar
                  GlobalState={GlobalState}
                  selectedDate={pickupDate}
                  setSelectedDate={setPickupDate}
                />
              )}
            </div>
            <div className='pickup-time-wrapper datetime-input input' onClick={() => {setPickupTimeIsVisible(!pickupTimeIsVisible)}}>
              <div className='label'>
                <FontAwesomeIcon icon={faClock} />
                <Translator
                  code={language}
                  value={`Pickup Time`}
                />
              </div>
              <div>
                {`${pickupDate.getHours().toString().padStart(2, '0')}:${pickupDate.getMinutes().toString().padStart(2, '0')}`}
              </div>
              {pickupTimeIsVisible && (
                <Time
                  GlobalState={GlobalState}
                  selectedDate={pickupDate}
                  setSelectedDate={setPickupDate}
                />
              )}
            </div>
          </div>
          {!returnInputIsVisible && (
            <div className='row'>
              <button onClick={handleAddReturnClick}>
                <Translator
                  code={language}
                  value={`Add return`}
                />
              </button>
            </div>
          )}
          {returnInputIsVisible && (
            <div className='row'>
            <div className='return-calendar-wrapper datetime-input input' onClick={() => {setReturnCalendarIsVisible(!returnCalendarIsVisible)}}>
              <div className='label'>
                <FontAwesomeIcon icon={faCalendarDays} />
                <Translator
                  code={language}
                  value={`Return Date`}
                />
              </div>
              <div>
                {`${returnDate.getDate().toString().padStart(2, '0')}/${(returnDate.getMonth() + 1).toString().padStart(2, '0')}/${returnDate.getFullYear()}`}
              </div>
              {returnCalendarIsVisible && (
                <Calendar
                  GlobalState={GlobalState}
                  selectedDate={returnDate}
                  setSelectedDate={setReturnDate}
                />
              )}
            </div>
              <div className='return-time-wrapper datetime-input input' onClick={() => {setReturnTimeIsVisible(!returnTimeIsVisible)}}>
                <div className='label'>
                  <FontAwesomeIcon icon={faClock} />
                  <Translator
                    code={language}
                    value={`Return Time`}
                  />
                </div>
                <div>
                  {`${returnDate.getHours().toString().padStart(2, '0')}:${returnDate.getMinutes().toString().padStart(2, '0')}`}
                </div>
                {returnTimeIsVisible && (
                  <Time
                    GlobalState={GlobalState}
                    selectedDate={returnDate}
                    setSelectedDate={setReturnDate}
                  />
                )}
                <button className="close" onClick={handleRemoveReturnClick}>
                  <FontAwesomeIcon icon={faCircleXmark}/>
                </button>
              </div>
            </div>
          )}
          <div className='passengers-input-wrapper' onClick={() => {setPassengerFormIsVisible(!passengerFormIsVisible)}}>
            <div className='passengers-input input'>
              <div className='label'>
                <FontAwesomeIcon icon={faUserGroup} />
                <Translator
                  code={language}
                  value={`Passengers`}
                />
              </div>
              <div>
                {adults + children + infants}
              </div>
            </div>
            {passengerFormIsVisible && (
              <Passengers
                GlobalState={GlobalState}
              />
            )}
          </div>
          <div className='row'>
            <button type='submit'>
              <Translator
                code={language}
                value={`Continue`}
              />
            </button>
          </div>
        </form>
			</div>
    </>
  )
}

export default Section1
  