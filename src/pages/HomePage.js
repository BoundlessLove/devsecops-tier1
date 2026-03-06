import React from "react"; 
import myPhoto from "../assets/Gita.jpg"
//import { useNavigate } from "react-router-dom"; 
import LoginButton from '../Components/LoginButton';
import SubscribeButton from '../Components/SubscribeButton';


export default function HomePage() {
  const product = {
    id: "gita_quotes_subscription",
    name: "Daily Gita Quotes Subscription",
    description: "Receive daily inspirational quotes from the Bhagavad Gita.",
    image: myPhoto,
    priceId: "price_ABC123xyz", // your recurring Stripe Price ID
    amount: 1000,
    interval: "month",
  };

  return (
    <div>
      <h1>Welcome</h1>
      <h3>Subscribe to Daily Gita Quotes</h3>

      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "300px",
          height: "300px",
          objectFit: "cover",
          borderRadius: "6px",
        }}
      />

      <p>{product.description}</p>
      <p>
        Price: ${(product.amount / 100).toFixed(2)} per {product.interval}
      </p>

      <SubscribeButton product={product} />
	  <br /><br />
	  <LoginButton />
    </div>
  );
}
