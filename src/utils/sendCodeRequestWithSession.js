// uses the session token from google to manage request.
export async function sendCodeRequestWithSession(email, sessionToken) {
	console.log("email: "+email+", sessionToken: "+sessionToken);
  const res = await fetch(`${process.env.REACT_APP_DEV_EMAIL_API_SERVER}/send-code-with-session-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
	  "x-api-key": process.env.REACT_APP_API_KEY, 
      Authorization: `Bearer ${sessionToken}`
    },
    body: JSON.stringify({ email })
  });

  if (!res.ok) {
    throw new Error("Failed to send code");
  }

  return res.json();
}
