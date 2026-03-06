/*import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const BuyNowButton = ({ product }) => {
	const { isLoading, isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();
}
const product = {
  id: "gita_quotes_subscription",
  name: "Daily Gita Quotes Subscription",
  description: "Receive daily inspirational quotes from the Bhagavad Gita.",
  priceId: "price_ABC123xyz", // your recurring Stripe Price ID
  amount: 500,
  interval: "month",
};

  const buy = async () => {
	// We need an access token for our API to get the 
	// Stripe Customer ID from
	const access_token = await getAccessTokenSilently();
	
	// Call the API endpoint, passing in the access token
	// as a header, and the Price ID as the payload
	fetch("/.netlify/functions/buy", {
		method: "POST",
		headers: {
			authorization: `Bearer ${access_token}`,
		},
		body: JSON.stringify({
			priceId: product.prices[0].id,
		}),
	})
		.then((res) => res.json())
		.then((json) => {
			// The response is a checkout session object,
			// which has a 'url' attribute which we simply
			// redirect the user to
			window.location.assign(json.url);
		});
 };
  
  if (isLoading) {return} <></>;
  
  if (isAuthenticated) return <button onClick={buy}>Buy Now</button>;
  
  return <button onClick={loginWithRedirect}>Log In To Purchase</button>;

  return (
	<>
		<h1>Home</h1>
		<p>Welcome to my web store!</p>
		<div classname="products">
			{products &&
				products.map((product) => {
					return (
						<div className="product" key={product.id}>
							<h2>{product.name}</h2>
							<p classname="img">
								<img src={product.images[0]} alt={product.name} />
							</p>
							<p classname="sku">SKU: {product.id}</p>
							<p classname="description">{product.description}</p>
							<p classname="price">{(product.prices[0].unit_amount / 100).toFixed(2)}</p>
							<p classname="buynow">
								<BuyNowButton product={product}>
							</p>
						</div>
					);
				})}
			</div>
		</>
	);
);

export default Home;
				
			}
	
  );*/