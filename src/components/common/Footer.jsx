import React, { useState, useEffect } from 'react';
import Picture from './Picture';
import Translator from './Translator';

function Footer({GlobalState}) {
  const {
		language, setLanguage,
		theme, setTheme, api
  } = GlobalState;

  return (
    <>
    	<footer>
        <ul>
          <li>
            <a>Terms & Conditions</a>
          </li>
          <li>
            <a>Privacy Policy</a>
          </li>
          <li>
            <a>Contact us</a>
          </li>
          <li>
            <a>About us</a>
          </li>
        </ul>
			</footer>
    </>
  )
}

export default Footer
  