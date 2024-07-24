import React, { useState, useEffect } from 'react';

function Admin({GlobalState}) {
  const {
		language, setLanguage,
		theme, setTheme, api
  } = GlobalState;

  return (
    <>
    	<div className='card'>
				Login Form
			</div>
    </>
  )
}

export default Admin
  