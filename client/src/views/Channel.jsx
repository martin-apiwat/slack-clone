import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Message from "../components/Message";
import { useParams } from "react-router-dom";

export default function Channel({ username }) {
  const { id } = useParams();
  const [text, setText] = useState("");

  const { data: messages } = useQuery({
    queryKey: ["messages", id],
    queryFn: () =>
      fetch("http://localhost:3000/channels/" + id).then((data) => data.json()),
  });

  async function sendMessage() {
    await fetch("http://localhost:3000/channels/" + id, {
      method: "POST",
      body: JSON.stringify({ text: text, username: username }),
      headers: { "Content-Type": "application/json" },
    });
  }

  return (
    <div>
      {messages
        ? messages.map((message) => <Message message={message} />)
        : "Loading..."}

      <div>
        <input type="text" onChange={(e) => setText(e.target.value)} />
        <button onClick={() => sendMessage()}>Send message</button>
      </div>
    </div>
  );
}
