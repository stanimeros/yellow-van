import React from 'react';

function Translator({ code, value, classNames }) {
  if (!code || !value || code==='EN'){ 
    //console.log("Error",code,value);
    return <span className={classNames}>{value}</span>; 
  }
  value = value.trim();
  const id = translationData.find(item => item.value === value)?.id;
  if (id){
    const translation = translationData.find(item => item.id === id && item.code === code);
    if (translation){
      return <span className={classNames}>{translation.value}</span>;
    }else{
      return <span className={classNames}>{translateAllWords(code, value)}</span>;
    }
  } else {
    return <span className={classNames}>{translateAllWords(code, value)}</span>;
  }
}

function translateAllWords(code, value) {
  var wordsArray = value.split(" ");
  var translatedWordsArray = [];
  for (var i = 0; i < wordsArray.length; i++){
    const id = translationData.find(item => item.value === wordsArray[i])?.id;
    if (id){
      const translation = translationData.find(item => item.id === id && item.code === code);
      translatedWordsArray.push(translation ? translation.value : wordsArray[i]);
    }else{
      translatedWordsArray.push(wordsArray[i]);
    }
  }
  return translatedWordsArray.join(" ");
}

export default Translator;

const translationData = [
  { id:1, code: `EN`, value: `Account` },
];


