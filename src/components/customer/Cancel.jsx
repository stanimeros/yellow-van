import React, { useState, useEffect } from 'react';

function Cancel({GlobalState}) {
  const {
		language, setLanguage,
		theme, setTheme, api
  } = GlobalState;

  return (
    <>
    	<div className='card'>
				Cancel Page
			</div>
    </>
  )
}

export default Cancel
  