//API-KEY not required in this function because on server side it is declared before api.use(apiKey)
export async function getCaptchaSessionToken(captchaToken) {
  const res = await fetch(`${process.env.REACT_APP_DEV_EMAIL_API_SERVER}/auth/captcha`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ captchaToken })
  });

  if (!res.ok) {
    throw new Error("CAPTCHA auth failed");
  }

  const data = await res.json();
  return data.token; // short-lived JWT
}