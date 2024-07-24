import React, { useState, useEffect } from 'react';
import Translator from '../../common/Translator';

function Section3({GlobalState}) {
  const {
    fromDestinationID, toDestinationID,
    pickupDate, returnDate,
    adults, children, infants,
    price, category,
    api, language,
  } = GlobalState;

  async function handleFormSubmit(e){
    e.preventDefault();
    var name = document.querySelector('#name').value;
    var email = document.querySelector('#email').value;
    var phone = document.querySelector('#phone').value;
    var transport = document.querySelector('#transport').value;
    var comments = document.querySelector('#comments').value;

    //FIXME: Validation checks

    try {
      const formData = {
        from_place_id: fromDestinationID,
        to_place_id: toDestinationID,
        pickupDate: pickupDate,
        returnDate: returnDate,
        adults: adults,
        children: children,
        infants: infants,
        name: name,
        email: email,
        phone: phone,
        transport: transport,
        comments: comments,
        category: category,
        price: price,
      };

      const response = await fetch(`${api}/payment.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.status = "success"){
        window.location.href = data.redirect_url;
      }else{
        //error
      }
    } catch (error) {
      console.error('handleFormSubmit:', error);
    }
  }
  
	return (
    <>
			<div className='section section-3'>
        <Translator
          language={language}
          value={`Your details`}
          classNames={`title`}
        />
        <form onSubmit={handleFormSubmit}>
          <div className='row'>
            <div className="form-input">
              <input type="text" id="name" name="name" autoComplete="off" required placeholder="John Davidson" />
              <label htmlFor="name" className="label-name">
                <Translator
                  language={language}
                  value={`Full Name`}
                  classNames="content-name"
                />
              </label>
            </div>
          </div>
          <div className='row'>
            <div className="form-input">
              <input type="text" id="email" name="email" autoComplete="off" required placeholder="example@mail.com" />
              <label htmlFor="email" className="label-name">
                <Translator
                  language={language}
                  value={`Email`}
                  classNames="content-name"
                />
              </label>
            </div>
          </div>
          <div className='row'>
            <div className="form-input">
              <input type="text" id="phone" name="phone" autoComplete="off" required placeholder="00 30 6912345678"/>
              <label htmlFor="phone" className="label-name">
                <Translator
                  language={language}
                  value={`Phone Number`}
                  classNames="content-name"
                />
              </label>
            </div>
          </div>
          <div className='row'>
            <div className="form-input">
              <input type="text" id="transport" name="transport" autoComplete="off" placeholder="A3916"/>
              <label htmlFor="transport" className="label-name">
                <Translator
                  language={language}
                  value={`Flight / Boat number`}
                  classNames="content-name"
                />
              </label>
            </div>
          </div>
          <div className='row'>
            <div className="form-input">
              <textarea type="text" id="comments" name="comments" autoComplete="off" placeholder='Comments about your transfer ..'/>
              <label htmlFor="comments" className="label-name">
                <Translator
                  language={language}
                  value={`Comments`}
                  classNames="content-name"
                />
              </label>
            </div>
          </div>
          <div className='row'>
            <label htmlFor='terms' className="label-name">
              <Translator
                language = {language}
                value={`Agree to the terms and policy`}
                classNames="content-name"
              />
            </label>
            <input type="checkbox" id="terms" name="terms" autoComplete="off" required />
          </div>
          <div className='payment-summary'>
            <table>
              <tbody>
                <tr>
                  <td>
                    <Translator
                      language={language}
                      value={returnDate ? `Round trip` : `One way trip`}
                    />
                  </td>
                  <td>
                    {returnDate ? `${(price*1.2).toFixed(2)}€` : `${(price).toFixed(2)}€`}
                  </td>
                </tr>
                {returnDate && (
                  <tr>
                    <td>
                      <Translator
                        language={language}
                        value={`Round trip 20% off`}
                      />
                    </td>
                    <td>
                      {`- ${(price*1.2 - price).toFixed(2)}€`}
                    </td>
                  </tr>
                )}
                <tr>
                  <td>
                    <Translator
                      language={language}
                      value={`Included VAT 24%`}
                    />
                  </td>
                  <td>
                  {`${(price*0.24).toFixed(2)}€`}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className='price' >
              <Translator
                language={language}
                value={`Total`}
              />
              {` ${price}€`}
            </div>
          </div>
          <button type='submit'>
            <Translator
              code={language}
              value={`Procced to payment`}
            />
          </button>
        </form>
			</div>
    </>
  )
}

export default Section3
  