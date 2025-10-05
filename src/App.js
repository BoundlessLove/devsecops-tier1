
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
	
	async function callProtectedApi(){
		try{
			const token = await getAccessTokenSilently();
			const response = await axios.get("http://localhost:4000/protected", {
				headers: {
					authorization: `Bearer ${token}`,
				},
			});
			console.log(response.data);
			//console.log(token);
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
