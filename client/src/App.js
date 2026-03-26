import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [msg, setMsg] = useState("");
  const [secureMsg, setSecureMsg] = useState("");

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
    const API_KEY = process.env.REACT_APP_API_KEY;

    console.log("API URL:", API_URL);
    console.log("API KEY length:", API_KEY?.length); // safe to print

    // --- Existing call ---
    fetch(`${API_URL}/api/hello`)
      .then(res => res.json())
      .then(data => setMsg(data.message))
      .catch(() => setMsg("ERROR: Backend unreachable"));

    // --- NEW: Protected call ---
    fetch(`${API_URL}/api/secure-data`, {
      headers: {
        "x-api-key": API_KEY
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(data => setSecureMsg(data.secret))
      .catch(() => setSecureMsg("ERROR: Unauthorized or backend unreachable"));
  }, []);

  return (
    <div>
      <h1>{msg || "Loading..."}</h1>
      <h2>{secureMsg|| "Loading Secure Message..."}</h2>
    </div>
  );
}

export default App;
