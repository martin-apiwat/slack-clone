import React, { useEffect, useState } from "react";
import { Hash } from "react-feather";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { data: channels } = useQuery({
    queryKey: ["channels"],
    queryFn: () =>
      fetch("http://localhost:3000/channels").then((data) => data.json()),
  });

  const location = useLocation();
  console.log(location);

  return (
    <div className="sidebar">
      <h1 className="sidebar-header">Martins Slack</h1>
      {channels
        ? channels.map((channel) => (
            <Link
              to={`/${channel._id}`}
              className={
                location.pathname === `/${channel._id}`
                  ? "sidebar-row sidebar-row-active"
                  : "sidebar-row"
              }
              key={channel._id}
            >
              <Hash />
              {channel.name}
            </Link>
          ))
        : "loading..."}
    </div>
  );
}
