//Uses Google Captcha like an API key

import { useState } from "react";
import axios from "axios";
import { runRecaptcha } from "../utils/runRecaptcha";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [stage, setStage] = useState("enter"); // enter → verify → done
  const [error, setError] = useState("");
  const cancelSignup = () => {
    setStage("enter");
    setPassword("");
    setConfirmPassword("");
    setCode("");
    setError("");
  };

  const sendCode = async (e) => {
    e.preventDefault();
    setError("");
	const token = await runRecaptcha("signup");

	if (!token) {
	  setError("CAPTCHA verification failed. Try again.");
	  return;
	}
	//console.log("Email: "+email+", Code:"+ token);
    try {
		await axios.post( 
			`${process.env.REACT_APP_DEV_EMAIL_API_SERVER}/send-code`, 
			{ email, 
			  captchaToken: token 
		    }, 
			{ headers: { 
			  "x-api-key": process.env.REACT_APP_API_KEY 
		      } 
			} 
		); 
		
		setStage("verify");    
	} catch {
      setError("Could not send verification code");
    }
  };

  const verifySignup = async (e) => {
    e.preventDefault();
    setError("");

    // 🔒 Passwords must match
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter them.");
      setPassword("");
      setConfirmPassword("");
      return;
    }
	
	// 🔒 Password must meet strength rules
	if (!isPasswordValid(password)) {
	  setError(
	    "Password must be 8–20 characters long and include one uppercase letter, one number, and one special character."
	  );
	  return;
	}
    try {
      await axios.post(`${process.env.REACT_APP_DEV_EMAIL_API_SERVER}/verify-signup`, {
        email,
        password,
        code
      },
	  { headers: { "x-api-key": process.env.REACT_APP_API_KEY } }
	  );

      setError("Signup successful. Please log in.");
      setStage("done");

    } catch (err) {
      // Extract error code from backend response
      const auth0Code = err.response?.data?.code;

      if (auth0Code === "invalid_password") {
        setError(
          "Invalid Password used. Need at least 8 characters, with one char each of type uppercase, number and special character."
        );
      } else if (auth0Code === "invalid_signup") {
        setError("The Email Address already has an account. Please log in instead.");
      } else {
        setError("Something went wrong. Check Passwords Match and please try again.");
      }
    }
  };
  
  function isPasswordValid(pwd) {
    const lengthOK = pwd.length >= 8 && pwd.length <= 20;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[^A-Za-z0-9]/.test(pwd);

    return lengthOK && hasUpper && hasNumber && hasSpecial;
  };



  return (
    <form onSubmit={stage === "enter" ? sendCode : verifySignup}>
      <h2>Create Account</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Email field always shown */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={stage !== "enter"}
      />

      {/* Stage 2: Password + Confirm Password + Code */}
      {stage === "verify" && (
        <>
	  	 <p style={{ fontSize: "0.9rem", color: "#555" }}>
		  Password must be at between 8 and 20 characters long and include:
		  <br />• one uppercase letter
		  <br />• one number
		  <br />• one special character
		 </p>
         <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Re-enter Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </>
      )}

	  <div style={{ marginTop: "10px" }}>
		{stage !== "done" && (
		  <>
	  	    <button type="submit">
		      {stage === "enter" ? "Send Verification Code" : "Complete Signup"}
		    </button>
	
		    {stage === "verify" && (
		      <button
		        type="button"
		        onClick={cancelSignup}
		        style={{ marginLeft: "10px", backgroundColor: "#ccc" }}
		      >
		        Cancel
		      </button>
		    )}
		  </>
		)}
	  </div>
    </form>
  );
}

export default Signup;