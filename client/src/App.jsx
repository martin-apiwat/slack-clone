import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <div className="main-container">
      <Sidebar />
      <div className="chat-section">chat-section</div>
    </div>
  );
}
