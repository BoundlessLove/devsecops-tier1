import { useAuth0 } from "@auth0/auth0-react"; 
import LoginButton from './LoginButton';
import Signup from "../pages/signup";
import "./NavbarAuthControls.css";

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
	<nav className="navbar">
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
				<p>----------------------------</p>
				<p><h3>Login</h3></p>
				<li>
					<button onClick={handleLogin}> 
					  Login with Popup 
					</button> 
				</li>
			</>
			)}
	</nav>
		</>
	);
}
		 
export default NavbarAuthControls; 