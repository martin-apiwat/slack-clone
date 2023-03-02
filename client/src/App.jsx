import React, { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [channels, setChannels] = useState(null);

  useEffect(() => {
    async function getChannels() {
      const response = await fetch("http://localhost:3000/channels");
      const data = await response.json();
      console.log(data);
    }
    getChannels();
  }, []);

  return (
    <div className="main-container">
      <div className="sidebar">sidebar</div>
      <div className="chat-section">chat-section</div>
    </div>
  );
}
