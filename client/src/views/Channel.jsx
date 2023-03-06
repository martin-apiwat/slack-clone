import React from "react";
import { useQuery } from "@tanstack/react-query";

export default function Channel() {
  const { data: messages } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      fetch("http://localhost:3000/channels/abc").then((data) => data.json()),
  });

  console.log(messages);

  return (
    <div>
      {messages
        ? messages.map((message) => <div>{message.text}</div>)
        : "Loading..."}
    </div>
  );
}
