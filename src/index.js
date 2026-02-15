import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  	<Auth0Provider
		domain='dev-5ytq8xlvrdmg2d03.us.auth0.com'
		clientId='apombnwMiJWNICbzBmar3rxMt48XOwYr'
		authorizationParams={{
			redirect_Uri: window.location.origin,
			audience: "https://www.systematicdefence.tech",
			scope: "offline_access"
		}}
	>
		<BrowserRouter>
	    <App />
		</BrowserRouter>
	</Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*
	Dependencies used Frontend Reactjs
	1. @auth0/auth0-react
	2. axios
	*/