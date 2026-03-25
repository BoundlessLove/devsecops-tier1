import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";

function App() {
	const [msg, setMsg] = useState("");



	

	useEffect(() => {
		const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
		console.log("API URL:", API_URL);
		
	  fetch(`${API_URL}/api/hello`)
	    .then(res => res.json())
	    .then(data => setMsg(data.message));
	}, []);

 /* return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
		<h1>{msg || "Loading..."}</h1>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );*/
  return <h1>{msg || "Loading..."}</h1>;
}

export default App;
