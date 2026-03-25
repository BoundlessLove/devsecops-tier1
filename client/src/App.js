import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
    console.log("API URL:", API_URL);

    fetch(`${API_URL}/api/hello`)
      .then(res => res.json())
      .then(data => setMsg(data.message))
      .catch(() => {
        // This is what your test is looking for
        setMsg("ERROR: Backend unreachable");
      });
  }, []);

  return <h1>{msg || "Loading..."}</h1>;
}

export default App;
