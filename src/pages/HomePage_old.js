//port PurchaseButton from "../Components/PurchaseButton";
//import PurchasePage from './purchase';
import React from "react"; 
import myPhoto from "../assets/Gita.jpg"
import { useNavigate } from "react-router-dom"; 

export default function HomePage(){

	const navigate = useNavigate(); 

	return(
		<div>
			<h1>Welcome</h1>
			<h3>Buy Daily Quotes from Holy Gita</h3>
			<img
			  src={myPhoto}
			  alt="My Photo"
			  style={{
			    width: "300px",
			    height: "300px",
			    objectFit: "cover",
			    borderRadius: "6px"
			  }}
			/>
	
			<p><button onClick={() => navigate("/purchase")}> 

			  Buy Now 

			</button> </p>

		</div>
	);

}