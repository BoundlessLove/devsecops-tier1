import { useState } from "react"; 
import axios from "axios"; 


  

function Signup() { 

  const [email, setEmail] = useState(""); 
  const [stage, setStage] = useState("enter");
  const [password, setPassword] = useState(""); 
  const [code, setCode] = useState("");
  const [error, setError] = useState(""); 

  

  const handleSignup = async (e) => { 

    e.preventDefault(); 

  

    try { 

      await axios.post(`https://dev-5ytq8xlvrdmg2d03.us.auth0.com/dbconnections/signup`, { 

        client_id: "apombnwMiJWNICbzBmar3rxMt48XOwYr", 

        email, 

        password, 

        connection: "Username-Password-Authentication" 

      }); 

	

      // Signup succeeded → redirect to login 
		
	  //window.location.href = getAuth0LoginUrl(
	  //			"Sign up successful. Please log in instead."); 
	  setError("Sign up successful. Please log in instead.");
  

    } catch (e) { 

      const code = JSON.stringify(e.response?.data?.code); 
	  const signupmessage = JSON.stringify(e.response?.data?.description); 

		//console.log(code+ ": "+ signupmessage);
  		//setError(code+ ": "+ signupmessage);
		//setError(code);
		if (code.includes("invalid_password")){
			setError("Invalid Password used. Need at least 8 characters, with one char each of type uppercase, number and special character."); 
		}else if (code.includes("invalid_signup")){
			setError("The Email Address already has an account. Please log in instead."); 
		}else{
			setError("Something went wrong. Please try again. "); 
		}
		return;
    } 

  }; 
  
  function getAuth0LoginUrl(msg) { 

    const domain = `dev-5ytq8xlvrdmg2d03.us.auth0.com/auth0.com`; 

    const clientId = "apombnwMiJWNICbzBmar3rxMt48XOwYr"; 

    const redirectUri = "http://localhost:3000/"; // or your SPA callback 

    

    const params = new URLSearchParams({ 

      client_id: clientId, 

      redirect_uri: redirectUri, 

      response_type: "code", 
	  error: "access_denied",
      error_description: msg 
    }); 

    

    return `https://${domain}/authorize?${params.toString()}`; 

  } 

  const sendCode = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/send-code", { email });
      setStage("verify");
    } catch {
      setError("Could not send verification code");
    }
  };

  const verifySignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/verify-signup", {
        email,
        password,
        code
      });
      setError("Signup successful. Please log in.");
    } catch {
      setError("Invalid code");
    }
  };

   return ( 

    <form onSubmit={handleSignup}> 

      <h2>Create Account</h2> 

  

      {error && <p style={{ color: "red" }}>{error}</p>} 

  

      <input 
	  	label="Email: "

        type="email" 

        placeholder="Email" 

        value={email} 

        onChange={(e) => setEmail(e.target.value)} 

        required 

      />

  

      <input 
	  	label="Password: "

        type="password" 

        placeholder="Password" 

        value={password} 

        onChange={(e) => setPassword(e.target.value)} 

        required 

      /> 

  

      <button type="submit">Sign Up</button> 

    </form> 

  ); 

} 

  

export default Signup; 