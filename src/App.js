import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import './App.css';
//import { useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
//import RegisterButton from './Components/RegisterButton';
//import LoginButton from './Components/LoginButton';
//import Signup from "./pages/signup";
import { Routes, Route } from "react-router-dom";
import PurchaseButton from './Components/PurchaseButton';
import PurchasePage from './pages/purchase';
import HomePage from './pages/HomePage';
import NavbarAuthControls from "./Components/NavbarAuthControls";
import myPhoto from "./assets/Gita.jpg"


function App() {
	// create hook
	const {
		loginWithPopup, 
		loginWithRedirect, 
		logout, 
		user, 
		isAuthenticated,
		getAccessTokenSilently, //This Access token is a JWT, that will be verified.
	} = useAuth0();

	const [output, setOutput] = useState(null);  //Store API response 
//	const { getAccessTokenSilently() } = useAuth0();  
	const [error, setError] = useState(null);     // Track errors 
	const [userName, setUserName] = useState('');
//	const navigate = useNavigate();
	const [hasApiAccess, setHasApiAccess] = useState(null);
	const [email, setEmail] = useState(null);
	

/*	const fetchData = (endpoint) => { 

	  setLoading(true); 

	  setError(null); 

	  axios.get(endpoint) // Replace with your API endpoint 

	    .then(response => { 

	      setData(response.data); 

	      setLoading(false); 

	    }) 

	    .catch(err => { 

	      setError(err.message); 

	      setLoading(false); 

	    }); 

	}; 



	return ( 

	  <div style={{ padding: '20px' }}> 

	    <h1>API Response Viewer</h1> 

	    <button onClick={fetchData}>Fetch API Data</button> 

	    {loading && <p>Loading...</p>} 

	    {error && <p style={{ color: 'red' }}>Error: {error}</p>} 

	    {data && <pre>{JSON.stringify(data, null, 2)}</pre>} 

	  </div> 

	); */
	
	function callApi(){
		axios.get("http://localhost:4000/")
		 .then(response => setOutput(response.data), setError(null))
			.catch(error => setOutput(null), setError(error?.message || "Unknown error occurred."))
//			.then(response => console.log(response.data))
//			.catch(error => console.log(error.message))
	}
	
	async function callTopSecretApi(){
		//const token = getToken();
		//const token = await getAccessTokenSilently();
		//console.log(token)
		/*try { 
			const token = await getAccessTokenSilently(); 
			console.log("Access Token:", token); 
			console.log("Decoded:", JSON.parse(atob(token.split('.')[1]))); 
		} catch (error) { 
			console.error("Token error:", error.message); 
		} */

// P30	
		if (!isAuthenticated){
			setOutput(null);
			setError("User not authenticated yet.");
			return;
		}
		try{
			const token = await getAccessTokenSilently();
			const response = await axios.get("http://localhost:4000/topsecret", {
				headers: {
					authorization: `Bearer ${token}`,
				},
			});
			//if (response.data) 
				//setOutput(response.data);
				//setOutput(token);
			
			if (response.data){
				setOutput(response.data);			
				//setOutput(token);
			}else{
				setOutput('You are missing permissions to see JWT token');
			}
			setError(null);
		}catch (error) {
			setOutput(null);
			if (error.response && (error.response.status === 404 || error.response.status === 403)) {
				setError(error.response.data.message); //"User Not Found" or "Missing required permisisons"
			} else {
				setError(error?.message || "Unknown error occurred.");
			}
		}
	}		
	
	async function checkApiAccess() {
		try {
			const res = fetch("/protected-api");
			if (!res.ok) throw new Error("No access");
			return true;
		} catch {
			return false;
		}
	}
	
	async function getEmail(){

		if (!isAuthenticated){
			setOutput(null);
			setError("User not authenticated yet.");
			return;
		}
		try{
			//const token = await getAccessTokenSilently();
			const token = await getAccessTokenSilently();
			const response = await axios.get("http://localhost:4000/email", {
				headers: {
					authorization: `Bearer ${token}`,
				},
			});
			//console.log(response.data);
			if (response.data){
				setOutput(response.data);
				//console.log(JSON.stringify(response.data, null, 2));
				//return JSON.stringify(response.data, null, 2);			
				//setOutput(token);
				user.email = response.data.email;
				return user.email;
			}else{
				setOutput('You are missing permissions to see email of logged in user');
				//console.log(token);
			}
			setError(null);
		}catch (error) {
			setOutput(null);
			if (error.response && (error.response.status === 403)) {
				setError(error.response.data.message); //"User Not Found" or "Missing required permisisons"
			} else {
				setError(error?.message || "Unknown error occurred.");
				//console.log(error.message);
			}
		}
	}
	
	async function callProtectedApi(){

		if (!isAuthenticated){
			setOutput(null);
			setError("User not authenticated yet.");
			return;
		}
		try{
			//const token = await getAccessTokenSilently();
			const token = await getAccessTokenSilently();
			const response = await axios.get("http://localhost:4000/protected", {
				headers: {
					authorization: `Bearer ${token}`,
				},
			});
			//console.log(response.data);
			if (response.data){
				setOutput(`
					Response:
					${JSON.stringify(response.data, null, 2)} 
					
					JWT:
					${JSON.stringify(token, null, 2)}
					`);			
				//setOutput(token);
			}else{
				setOutput('You are missing permissions to see ProtectedAPI');
				//console.log(token);
			}
			setError(null);
		}catch (error) {
			setOutput(null);
			if (error.response && (error.response.status === 403)) {
				setError(error.response.data.message); //"User Not Found" or "Missing required permisisons"
			} else {
				setError(error?.message || "Unknown error occurred.");
				//console.log(error.message);
			}
		}
	}
	
	
	async function callUserApi(name){

		if (!isAuthenticated){
			setOutput(null);
			setError("User not authenticated yet.");
			return;
		}
		try{
			const token = await getAccessTokenSilently();
			const response = await axios.get(`http://localhost:4000/users/${name}`, {
				headers: {
					authorization: `Bearer ${token}`,
				},
			});
			setOutput(response.data);
			setError(null);
		}catch (error) {
			setOutput(null);
			if (error.response && (error.response.status === 404 || error.response.status === 403)) {
				setError(error.response.data.message); //"User Not Found" or "Missing required permisisons"
			} else {
				setError(error?.message || "Unknown error occurred.");
			}
		}
	}
	//allows names like Mary Jane and 'Anna-Marie'	
	function isTextOnly(input) { 
		if(input && /^[A-Za-z\s\-]+$/.test(input)){ //exists and meets format
			return true;  
		} 
		return false;
	} 
	
	useEffect(() => {
		if (isAuthenticated){
			checkApiAccess().then(setHasApiAccess);
			//setEmail(getEmail());
			(async () => {
				const emailValue = await getEmail();
				setEmail(emailValue);
			})();
		}
	}, [isAuthenticated]);
  	return (
		<>
	    <div className="App">
		
			<h1>Late Grandmother Kumari Raj Sarna's last wish- परमात्मा सबको सद्बुद्धि देवे</h1>
			<h3>User: {email ?? "Not Logged in"} </h3>
			<div>
				<img src={myPhoto} alt="My Photo" />
			</div>
			<ul>
				<NavbarAuthControls />
			</ul>
			<ul>
				<li><button onClick={callApi}>Call API route</button></li>
				<li><button onClick={callProtectedApi}>Call Protected API route</button></li>
				
				{isAuthenticated && hasApiAccess === false && (
					<li>
						<PurchaseButton />
					</li>
				)}
				
				
				<li><button onClick={callTopSecretApi}>Call View JWT Token</button></li>
				<li>
					<input
					type="text"
					placeholder="Enter user name"
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
					/>
					<button onClick={() => {
						if (isTextOnly(userName)){
							callUserApi(userName);
						} else {
							alert("Only names allowed - no numbers or symbols. Names can have space or dashes.");
						} 
					}}>Get specified user's detail from database</button>
				</li>
			</ul>
			
			{isAuthenticated && (
				<pre style={{ textAlign: 'start' }}>
					{JSON.stringify(user, null, 2)}
				</pre>
			)}
			{output && ( 
	
			        <div style={{ marginTop: '20px' }}> 
	
			          <h3>API Response:</h3> 
	
			          <pre>{JSON.stringify(output, null, 2)}</pre> 
	
			        </div> 
	
			      )} 
	
		      {error && (error !== "Unknown error occurred.") && ( 
	
		        <div style={{ marginTop: '20px', color: 'red' }}> 
	
		          <h3>Error:</h3> 
	
		          <p>{error}</p> 
	
		        </div> 
	
		      )} 
	    </div>
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/purchase" element={<PurchasePage />} />
		</Routes>
	</>
  );
  

}

export default App;
