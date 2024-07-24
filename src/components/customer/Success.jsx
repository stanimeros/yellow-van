import React, { useState, useEffect } from 'react';

function Success({GlobalState}) {
  const {
		language, setLanguage,
		theme, setTheme, api
  } = GlobalState;

  return (
    <>
    	<div className='card'>
				Success Page
			</div>
    </>
  )
}

export default Success
  