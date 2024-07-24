import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faSearch } from '@fortawesome/free-solid-svg-icons';
import Translator from '../../common/Translator';

function SearchPlace({GlobalState, setPlaceID, placeDesc, setPlaceDesc}) {
  const {
    api, language,
  } = GlobalState;

  const [searchValue, setSearchValue] = useState(placeDesc ? placeDesc : '');
  const [responseData, setResponseData] = useState(null);
  const [valueFromInput, setValueFromInput] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (!valueFromInput) {
        return;
      }
    
      if (searchValue.length<3){
        setResponseData(null);
        return;
      }

      fetch(`${api}/get_predictions.php?input=${searchValue}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(data => {
        setResponseData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  const handleInputChange = (e) => {
    setValueFromInput(true);
    setSearchValue(e.target.value);
  };

  const handleUnfocus = (e) => {
    const clickedElement = e.relatedTarget;
    if (!clickedElement || clickedElement.className!=="result"){
      setResponseData(null);
    }
  };
  
  const handleFocus = (e) => {
    setSearchValue('');
  };

  const handleResultClick = (description, place_id) => {
    setResponseData(null);
    setPlaceID(place_id);
    setValueFromInput(false);
    setSearchValue(description);
    setPlaceDesc(description);
  };

  return (
    <div className="search-input" id="search-input">
      <FontAwesomeIcon icon={faSearch}/>
      <div className='input-results'>
        <input
          className="input"
          placeholder={`${Translator({code:language, value:"Region, Town, City"}).props.children}...`}
          value={searchValue}
          onChange={handleInputChange}
          onBlur={handleUnfocus}
          onFocus={handleFocus}
        />
        {responseData && (
          <div className='results'>
            {responseData.map((result, index) => (
              <div key={index} tabIndex={index} className='result' onClick={(event) => 
                handleResultClick(result.description, result.place_id)}>
                <FontAwesomeIcon icon={faLocationDot} />
                <div className='value'>{result.description}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPlace;
