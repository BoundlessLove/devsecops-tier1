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
import proof from "./assets/Proof.jpg"
import dove from "./assets/dove.jpg"
import ProtectedRoute from "./Components/ProtectedRoute";


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
	
	const devClient = process.env.REACT_APP_DEV_CLIENT;
	const devServer = process.env.REACT_APP_DEV_SERVER;
	
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
	
/*	function callApi(){
		axios.get(devServer)
		 .then(response => setOutput(response.data), setError(null))
			.catch(error => setOutput(null), setError(error?.message || "Unknown error occurred."))
//			.then(response => console.log(response.data))
//			.catch(error => console.log(error.message))
	}*/
	
	function callApi() {
	  axios.get(devServer)
	    .then(response => {
	      setOutput(response.data);
	      setError(null);
	    })
	    .catch(error => {
	      setOutput(null);
	      setError(error?.message || "Unknown error occurred.");
	    });
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
			const response = await axios.get(devServer+"/topsecret", {
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
			const response = await axios.get(devServer+"/email", {
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
			const response = await axios.get(devServer+"/protected", {
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
			const response = await axios.get(`${devServer}/users/${name}`, {
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
		<div class="header-wrapper"> 
		 <img src={dove} class="corner-img left-img" alt="" /> 
		 <h1>Late Grandmother Kumari Raj Sarna's (1937-2023) last wish:</h1> <h1><u>Webstore: "May God Give Divine Intelligence to all"</u></h1>
		 <img src={dove} class="corner-img right-img" alt="" /> 
		</div>

			<div>
				<h2>i. Importance of God's word</h2>
				<div className="auth-wrapper">
					<div className="auth-box-main">
					  <div className="auth-controls">
						<h3><u>1. CONTEXT</u></h3>
					    <p><b>A human is a product of its: <p><i>a. Circumstances, and</i></p><p><i>b. Efforts</i></p></b></p><p>Efforts, in particular, are the means to improve our condition - mentally, spiritually, economically, physically and in all possible domains. Then the question arises where the focus of our naturally limited human efforts should lie to bring maximum benefit.</p>
						<h3><u>2. IMPORTANCE OF BONAFIDE SCRIPTURAL READING</u></h3>
						<h4>a. The Saint</h4><p> Arguably, the foremost saint in my living memory is the avid spiritual writer Late Swami Ramsukhdas ji (1904-3 July 2005) of Gita Press Gorakhpur Publishers, India (Bhalotia, 2026). The irony is that when the great saint took his last breath (from natural causes), my parents 'Ashwini Kumar Sarna' and 'Renu Sarna' were standing outside his door in the queue, inorder to first time lay their eyes on him.</p> <p>🕯️ REST IN PEACE 🕯️</p>
						<h4>b. The Learning</h4><p> On December 7, 2023, facebook channel Geeta Press Gorakhpur released a statement from him in which he says:</p>
						<p>A person once asked me,:</p> <p><i>- What is the minimum prayer one must do?</i></p> I answered, enough that wherever you are, you don't fall from there. So, example, in this life your soul received a human body. It should be ensured that once your soul leaves your body at the time of death, atleast its next destination is another human body. The means to that end is to read from the Gita every day (Geeta Press Gorakhpur, 2023, Dec, 7).
						</div>
						</div>
					</div>
					

				<h2>ii. Why charge for sharing God's word?</h2><p>This site is a one stop shop for selling quotations from the 'Good News Bible' akin Gita, as per Section 2b) above. Nowadays, nearly all 'current affairs' media outlets such as the Washington Post and the New Zealand Herald require a subscription to access their media content. This is ethical and a mark of quality in 2026, as they run a business which employs staff, and staff need to be paid.</p> 
			</div>
			<h3>User: {email ?? "Not Logged in"} </h3>
			<div className="auth-wrapper">
				<div className="auth-box">
				  <div className="auth-controls">
				    <NavbarAuthControls />
				  </div>
				</div>
			</div>
			<ul>
				<div className="auth-wrapper">
				<div className="auth-box">
				  <div className="auth-controls">
				<li><p>1. Available to Guest: </p><p><button onClick={callApi}>Call API route</button></p></li>
				<li><p>2. Purchase Option: </p><p><button onClick={callProtectedApi}>Purchase Quotes from Sanatana Dharma Oath book</button></p></li>
				
				{isAuthenticated && hasApiAccess === false && (
					<li>
						<p><PurchaseButton /></p>
					</li>
				)}
				
				
				<li><p>3. To Comply with NZ Privacy Law: </p><p>For {email ?? "user"} <button onClick={callTopSecretApi}>View JWT Token</button></p></li>
				<li>
					<p>4. Connecting to Third Party database API: </p><p><input
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
					}}> Get specified user's detail from database</button><i>[Hint: Try 'Alice' or 'Bob']</i></p>
				</li>
					  </div>
					</div>
				</div>
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
			<Route
			  path="/home"
			  element={
			    <ProtectedRoute>
			      <HomePage />
			    </ProtectedRoute>
			  }
			/>
			<Route
			  path="/purchase"
			  element={
			    <ProtectedRoute>
			      <PurchasePage />
			    </ProtectedRoute>
			  }
			/>
		</Routes>
		<h3>References</h3>
		<p>1.Bhalotia, A.(2026). Shri Hari Supremely Venerable Swamiji Shree Ramsukhdasji Maharaj | श्री हरि: परम श्रद्धये स्वामीजी श्री रामसुखदासजी महाराज . https://www.shriswamiramsukhdasjimaharaj.com/index.html. Last Accessed: 21 Feb 2026</p> 
		<p>2. garten-gg.(2026). Pixabay- Bird, Dove, Cage image, Free for use. https://pixabay.com/photos/bird-dove-cage-symbol-peace-5563436/</p>
		<p>3. Geeta Press Gorakhpur.(2023, Dec, 7). Facebook- Narayan Narayan Narayan Narayan. https://www.facebook.com/share/p/18AhMoXMPH/</p>
		<p></p>
		<p><b>© 2026 Jyotirmay Sarna. The content on this site is original. Do not copy, repost, or use without permission.</b></p>
	</>
  );
  

}

export default App;
