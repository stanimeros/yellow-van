import React from 'react';
import Translator from './Translator';

function C494({GlobalState}) {
  const {
    language,
  } = GlobalState;
  
  return (
    <>
    	<div>
				<Translator
					code={language}
					value={"Not found"}
				/>
			</div>
    </>
  )
}

export default C494
  