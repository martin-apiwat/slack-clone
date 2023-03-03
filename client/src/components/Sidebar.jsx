import React, { useEffect, useState } from "react";
import { Hash } from "react-feather";

export default function Sidebar() {
  const [channels, setChannels] = useState(null);

  useEffect(() => {
    async function getChannels() {
      const response = await fetch("http://localhost:3000/channels");
      const data = await response.json();
      console.log(data);
      setChannels(data);
    }
    getChannels();
  }, []);
  return (
    <div className="sidebar">
      <h1 className="sidebar-header">Martins Slack</h1>
      {channels
        ? channels.map((channel) => (
            <div className="sidebar-row">
              <Hash />
              {channel.name}
            </div>
          ))
        : "loading..."}
    </div>
  );
}
