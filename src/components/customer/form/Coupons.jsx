import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faSearch } from '@fortawesome/free-solid-svg-icons';
import Translator from '../../common/Translator';

function Coupons({GlobalState}) {
  const {
    api, language,
  } = GlobalState;

	function handleCouponFormSubmit(e){
		e.preventDefault();

		console.log('Coupon validation');
	}

  return (
    <div className='card coupon-card'>
			<form className='coupon-form' onSubmit={handleCouponFormSubmit}>
				<label htmlFor='coupon'>
					<Translator
						language={language}
						value={`Have a coupon?`}
					/>
				</label>
				<input id='coupon' type='text' required/>
				<button type='submit'>
					<Translator
						language={language}
						value={`Reedem`}
					/>
				</button>
			</form>

    </div>
  );
}

export default Coupons;
