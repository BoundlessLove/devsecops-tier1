import React from "react"; 

import { useAuth0 } from "@auth0/auth0-react"; 

  

export default function PurchasePage() { 

  const { user, isAuthenticated } = useAuth0(); 

  

  if (!isAuthenticated) { 

    return ( 

      <div style={{ padding: "20px" }}> 

        <h2>You must be logged in to make a purchase</h2> 

      </div> 

    ); 

  } 

  

  return ( 

    <div style={{ padding: "20px" }}> 

      <h1>Purchase Page</h1> 

  

      <p> 

        Logged in as: <strong>{JSON.stringify(user, null, 2)}</strong> 

      </p> 

  

      <p>This is your purchase confirmation stub.</p> 

  

      <button 

        style={{ 

          padding: "10px 20px", 

          backgroundColor: "#007bff", 

          color: "white", 

          border: "none", 

          borderRadius: "5px", 

          cursor: "pointer" 

        }} 

        onClick={() => alert("Purchase flow not implemented yet")} 

      > 

        Confirm Purchase 

      </button> 

    </div> 

  ); 

} 