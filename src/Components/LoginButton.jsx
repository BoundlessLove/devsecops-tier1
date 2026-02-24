import { useAuth0 } from "@auth0/auth0-react"; 
  
//Login Button with popup
function LoginButton() { 

  const { loginWithPopup, logout, isAuthenticated } = useAuth0(); 

  

  return ( 

    <li> 

      {isAuthenticated ? ( 

        <button onClick={() => logout({ returnTo: window.location.origin })}> 

          Logout 

        </button> 

      ) : ( 
		

        <button onClick={loginWithPopup}> 

          Login with Popup 

        </button> 

      )} 

    </li> 

  ); 

} 


export default LoginButton; 