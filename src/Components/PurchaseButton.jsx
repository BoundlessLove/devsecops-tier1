import React from "react"; 

import { useNavigate } from "react-router-dom"; 

  

export default function PurchaseButton() { 

  const navigate = useNavigate(); 

  

  return ( 

    <button onClick={() => navigate("/home")}> 

      Buy Now 

    </button> 

  ); 

} 