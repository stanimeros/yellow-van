import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Routes, Route } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Form from './components/customer/Form';
import Success from './components/customer/Success';
import Cancel from './components/customer/Cancel';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import C404 from './components/common/C404';
import Admin from './components/admin/Admin';

function App() {

	const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage') || 'EN'); 
	const [theme, setTheme] = useState('light');
	const [api] = useState(
		window.location.href.includes('localhost')
			? 'http://localhost/taxi/public/api' //Development API
			: '/api' //Production API
	);
	
	const GlobalState = {
		language, setLanguage,
		theme, setTheme,
		api
	}

	const navigate = useNavigate();
	useEffect(() => {
		window.scrollTo({
			top: 0,
			//behavior: 'smooth',
		});

	}, [navigate]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta name="description" content="Description"/>
          <meta property="og:description" content="Description"/>
          <meta property="og:type" content='website' />
          <meta property="og:image" content='/vite.svg' />
          <meta property='og:site_name' content='Taxi Form' />
          <meta property="og:url" content={window.location.href} />
          <link rel="canonical" href={window.location.href.split('?')[0]}></link>
          <meta name="robots" content="index, follow" />
          {language == 'EN' && ( <meta http-equiv="Content-Language" content='en-us'/> )}
          {language == 'EL' && ( <meta http-equiv="Content-Language" content='el-gr'/> )}
        </Helmet>
      </HelmetProvider>
      <Header GlobalState = {GlobalState} />
      <Routes>
        <Route exact path = "/" element = {<Form GlobalState = {GlobalState} />} />
        <Route exact path = "/success" element = {<Success GlobalState = {GlobalState} />} />
        <Route exact path = "/cancel" element = {<Cancel GlobalState = {GlobalState} />} />
        <Route exact path = "/admin" element = {<Admin GlobalState = {GlobalState} />} />
        <Route path = "*" element = {<C404 GlobalState = {GlobalState} />} />
			</Routes>
      <Footer GlobalState = {GlobalState} />
    </>
  )
}

export default App;