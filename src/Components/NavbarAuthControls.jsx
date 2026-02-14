import { useAuth0 } from "@auth0/auth0-react"; 
import LoginButton from './LoginButton';
import Signup from "../pages/signup";

function NavbarAuthControls() { 
	const { isAuthenticated, loginWithPopup, logout} = useAuth0(); 
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
					<button onClick={loginWithPopup}> 
					  Login with Popup 
					</button> 
				</li>
			</>
			)}
		</>
	);
}
		 
export default NavbarAuthControls; 