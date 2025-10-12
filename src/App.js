
import axios from 'axios';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
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
	
	function callApi(){
		axios.get("http://localhost:4000/").then(response => console.log(response.data))
			.catch(error => console.log(error.message))		
	}
	
	async function callTopSecretApi(){
		//const token = getToken();
		const token = await getAccessTokenSilently();
		//console.log(token)
		/*try { 
			const token = await getAccessTokenSilently(); 
			console.log("Access Token:", token); 
			console.log("Decoded:", JSON.parse(atob(token.split('.')[1]))); 
		} catch (error) { 
			console.error("Token error:", error.message); 
		} */

// P30	
		try{
			const token = await getAccessTokenSilently();
			const response = await axios.get("http://localhost:4000/topsecret", {
				headers: {
					authorization: `Bearer ${token}`,
				},
			});
			console.log(response.data);
			console.log(token);
		}catch (error) {
			console.log(error.message);
		}
	}		
	
	
	async function getToken() { 
		try { 
			const response = await fetch('https://dev-5ytq8xlvrdmg2d03.us.auth0.com/oauth/token', 
			{ 
				method: 'POST', 
				headers: { 'content-type': 'application/json' }, 
/*				body: JSON.stringify({ 
					client_id: 'xYrBzk8lSAJIZrltRIcxTkTVZ5V2MBq8', 
					client_secret: 'RVYaN9uvT0afSb_Z3ALPtosJ-viONywmgsz7dDeo8_71MBay6rreZc_uc8f3bDjN', 
					audience: 'https://your-api-identifier', 
					grant_type: 'client_credentials' 
				}), */
				body: JSON.stringify({ 
					client_id: 'apombnwMiJWNICbzBmar3rxMt48XOwYr', 
					client_secret: 'DCvTtzwbnqAyfPM8qYWl3kZc8a3A8pdDTjs8bYoIfRi4nUz63pAiPsx7141RX6lu', 
					audience: 'this is a unique identifier', 
					grant_type: 'client_credentials' 
				}),
			}); 
			const text = await response.text(); // Read raw response 
			console.log('Raw response:', text); 
	 
			const data = JSON.parse(text); // Try parsing only if it's valid 
			console.log('Parsed token:', data); 
	 

		} catch (error) { 
			console.error('Error fetching token:', error); 
		} 
	} 
	
	async function callProtectedApi(){
		//const token = getToken();
		const token = await getAccessTokenSilently();
		//console.log(token)
		/*try { 
			const token = await getAccessTokenSilently(); 
			console.log("Access Token:", token); 
			console.log("Decoded:", JSON.parse(atob(token.split('.')[1]))); 
		} catch (error) { 
			console.error("Token error:", error.message); 
		} */

// P30	
		try{
			const token = await getAccessTokenSilently();
			const response = await axios.get("http://localhost:4000/protected", {
				headers: {
					authorization: `Bearer ${token}`,
				},
			});
			console.log(response.data);
			console.log(token);
		}catch (error) {
			console.log(error.message);
		}
	}

  return (
    <div className="App">
		<h1>Auth0 authentication</h1>
		<u1>
			<li>
				<button onClick={loginWithPopup}>Login with Popup</button>
			</li>
			<li>
				<button onClick={loginWithRedirect}>Login with Redirect</button>
			</li>
			<li>
				<button onClick={logout}>Logout</button>
			</li>
		</u1>
		<h3>User is { isAuthenticated ? "Logged in" : "Not logged in" }</h3>
		
		<u1>
			<li><button onClick={callApi}>Call API route</button></li>
			<li><button onClick={callProtectedApi}>Call Protected API route</button></li>
			<li><button onClick={callTopSecretApi}>Call Top Secret API route</button></li>
		</u1>
		
		{isAuthenticated && (
			<pre style={{ textAlign: 'start' }}>
				{JSON.stringify(user, null, 2)}
			</pre>
		)}
    </div>
  );
}

export default App;
