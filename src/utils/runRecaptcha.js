export async function runRecaptcha (action){
	if (!window.grecaptcha) {
	  console.error("reCAPTCHA not loaded");
	  return null;
	}

	try {
	  const token = await window.grecaptcha.execute(
	    "6LfApX0sAAAAAM_abp3VmTcR41aTJvj_uYmCLwFT",
	    { action }
	  );
	 //testing	
	  //const token = await window.grecaptcha.execute("6LfApX0sAAAAAM_abp3VmTcR41aTJvj_uYmCLwFT", { action: "login" });
	  //console.log("reCAPTCHA token:", token);
	  alert("CAPTCHA Action: " + action +", CAPTCHA Token: "+ token);
	  return token;
	} catch (err) {
	  console.error("reCAPTCHA error:", err);
	  return null;
	}

}