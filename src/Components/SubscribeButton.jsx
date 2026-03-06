//import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function SubscribeButton({ product }) {
  const {
    isLoading,
    isAuthenticated,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();

  const subscribe = async () => {
    try {
      console.log("Subscribe clicked");

      const accessToken = await getAccessTokenSilently();
      console.log("Token:", accessToken);

      const res = await fetch(
        `${process.env.REACT_APP_DEV_EMAIL_API_SERVER}/api/subscribe-daily-quotes`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ priceId: product.priceId }),
        }
      );

      console.log("Response status:", res.status);

      const session = await res.json();
      console.log("Session:", session);

      window.location.assign(session.url);
    } catch (err) {
      console.error("Subscribe error:", err);
    }
  };


  if (isLoading) return <></>;

  if (!isAuthenticated)
    return <button onClick={loginWithRedirect}>Log In To Subscribe</button>;

  return <button onClick={subscribe}>Subscribe</button>;
}
