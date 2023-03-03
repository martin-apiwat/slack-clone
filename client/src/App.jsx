import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Channel from "./views/Channel";

export default function App() {
  return (
    <div className="main-container">
      <Sidebar />
      <Routes>
        <Route
          path="/"
          element={<div className="chat-selection">chat selection</div>}
        />
        <Route path="/:id" element={<Channel />} />
      </Routes>
    </div>
  );
}
