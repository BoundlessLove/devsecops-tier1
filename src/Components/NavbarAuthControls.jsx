import { useAuth0 } from "@auth0/auth0-react"; 
import LoginButton from './LoginButton';
import Signup from "../pages/signup";

function NavbarAuthControls() { 
	const { isAuthenticated, loginWithPopup, logout} = useAuth0(); 
	const handleLogin = async () => {
		console.log("Login button clicked — calling loginWithPopup()");	
	  try {
	    await loginWithPopup();
	  } catch (e) {
	    console.error("Auth0 Popup Error:", e);
	  }
	};
  return (
	<>
		{isAuthenticated ? ( 	
			<li>
			<button onClick={() => logout({ returnTo: window.location.origin })}> 
			  Logout 
			</button> 
				</li>	
			) : (
				<>
				<li>
					<Signup />
				</li>
				<li>
					<button onClick={handleLogin}> 
					  Login with Popup 
					</button> 
				</li>
			</>
			)}
		</>
	);
}
		 
export default NavbarAuthControls; 