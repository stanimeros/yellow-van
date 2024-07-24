import React, { useState, useEffect } from 'react';
import Picture from './Picture';
import Translator from './Translator';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

function Header({GlobalState}) {
  const {
		language, setLanguage,
		theme, setTheme, api
  } = GlobalState;

  return (
    <>
    	<header>
        <Link to='/' className='logo-wrapper'>
          <Picture
            image_url={'/images/logo_transparent.png'}
            width={120}
            classNames='logo'
            title={`logo`}
          />
          <span className='logo-text'>
            {`Yellow`}
          </span>
          <span className='logo-text-black'>
            {`Van`}
          </span>
        </Link>
        <div className='language-selector'>
          {`EN`}
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
			</header>
    </>
  )
}

export default Header
  