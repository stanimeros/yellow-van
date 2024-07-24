import React, { useState, useEffect } from 'react';
import Translator from '../../common/Translator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function Calendar({GlobalState, selectedDate, setSelectedDate}) {
  const {
    currentDate,
    pickupDate, setPickupDate,
    returnDate, setReturnDate,
    language
  } = GlobalState;

  const monthNames = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  
  const [selectedDay, setSelectedDay] = useState(selectedDate.getDate());
  const [selectedMonth, setSelectedMonth] = useState(selectedDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());

	const [currentDay, setCurrentDay] = useState(currentDate.getDate());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const [emptyDaysArray,setEmptyDaysArray] = useState([]);
  const [daysArray,setDaysArray] = useState([]);

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
    setSelectedDate(new Date(selectedYear, selectedMonth - 1, selectedDay, selectedDate.getHours(), selectedDate.getMinutes()));
  }, [selectedDay]);

  useEffect(() => {
    var firstDayOfMonth = new Date(selectedYear, selectedMonth - 1, 1).getDay();
    if (firstDayOfMonth==0){firstDayOfMonth = 7;}
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  
    const emptyDaysArray = [];
    for (let day = 0; day <firstDayOfMonth - 1; day++) {
        emptyDaysArray.push(day);
    }
    setEmptyDaysArray(emptyDaysArray);
    
    const daysArray = [];
    for (let day = 1; day <= daysInMonth; day++) {
        daysArray.push(day);
    }
    setDaysArray(daysArray);

    setSelectedDate(new Date(selectedYear, selectedMonth - 1, selectedDay, selectedDate.getHours(), selectedDate.getMinutes()));
  }, [selectedMonth, selectedYear]);

  const handlePrevMonth = (e) => {
    var tempSelectedMonth = ((selectedMonth + 10) % 12) + 1;

    if (tempSelectedMonth >= currentMonth || currentYear != selectedYear){
      setSelectedMonth(tempSelectedMonth);
      setSelectedYear(selectedYear => tempSelectedMonth === 12 ? selectedYear - 1 : selectedYear);
    }
  };

  const handleNextMonth = () => {
    var tempSelectedMonth = (selectedMonth % 12) + 1;
    setSelectedMonth(tempSelectedMonth);
    setSelectedYear(selectedYear => tempSelectedMonth === 1 ? selectedYear + 1 : selectedYear);
  };

  const handleDaySelection = (event,day) => {
    const clickedDay = event.currentTarget;
    var days = document.querySelectorAll(".selected-day");
    days.forEach(day => {
      day.classList.remove("selected-day");
    });
    clickedDay.classList.add("selected-day");
    setSelectedDay(day);
  };

	const handleCalendarClick = (e) => {
		e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="calendar-form day-selector card" onClick={handleCalendarClick}>
      <div className="top">
        <div className="prev-month" onClick={handlePrevMonth}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div className="month">
          <Translator
            code={language}
            value={monthNames[selectedMonth - 1]}
          />
          {" "}
          {selectedYear}
        </div>
        <div className="next-month" onClick={handleNextMonth}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
      <div className="names">
        <div>
          <Translator
            code={language}
            value={"Mon"}
          />
        </div>
        <div>
          <Translator
            code={language}
            value={"Tus"}
          />
        </div>
        <div>
          <Translator
            code={language}
            value={"Wed"}
          />
        </div>
        <div>
          <Translator
            code={language}
            value={"Thu"}
          />
        </div>
        <div>
          <Translator
            code={language}
            value={"Fri"}
          />
        </div>
        <div>
          <Translator
            code={language}
            value={"Sat"}
          />
        </div>
        <div>
          <Translator
            code={language}
            value={"Sun"}
          />
        </div>
      </div>
      <div className="days">
        {emptyDaysArray.map((day) => (
          <div key={day} className="no-day"></div>
        ))}
        {daysArray.map((day, index) => (
          (((index>=currentDay-1 && currentMonth==selectedMonth && currentYear == selectedYear) || 
          (selectedMonth > currentMonth && selectedYear == currentYear) || (selectedYear > currentYear)) ?
						(<div onClick={(event) => handleDaySelection(event, day)} className={`day ${selectedDay === day ? 'selected-day' : ''}`} key={day}>{day}</div>) :
						(<div className="day locked" key={day}>{day}</div>))
        ))}
      </div>
    </div>
  )
}
export default Calendar
  