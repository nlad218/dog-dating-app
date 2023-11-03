import { useState } from "react";
import { QUERY_MATCH_MESSAGES } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";

export default function ActiveConversation({ active, children }) {
  const [newMessage, setNewMessage] = useState("");
  const { data, loading, err } = useQuery(QUERY_MATCH_MESSAGES, {
    variables: {
      matchId: active,
    },
  });

  const selfId = Auth.getProfile()._id;
  const messages =
    data?.messages.map((message) => {
      return {
        id: message._id,
        sender: message.user._id === selfId,
        content: message.messageText,
        timestamp: message.createdAt,
      };
    }) || [];

  function handleSendMessage(event) {
    event.preventDefault();
    // USE MUTATION TO ADD A MESSAGE TO THE CONVERSATION
    setNewMessage("");
  }

  if (loading) return "loading...";
  if (err) return `Error! ${err}`;

  return (
    <div className="w-full min-h-fit rounded-xl bg-base-200 shadow-xl">
      <div className="text-2xl bg-primary text-primary-content font-semibold rounded-t-xl flex flex-row gap-4">
        <div className="p-2">{children}</div>
        <h1 className="p-2">(NAME)</h1>
      </div>
      <div className="text-lg lg:text-2xl py-4">
        {messages.map(({ id, sender, content }) => (
          <div
            className={sender ? "chat chat-end" : "chat chat-start"}
            key={id}
          >
            <div
              className={
                sender ? "chat-bubble chat-bubble-primary" : "chat-bubble"
              }
            >
              {content}
            </div>
          </div>
        ))}
      </div>
      <div className="p-2 join w-full">
        <input
          className="join-item w-full p-2 text-lg input input-primary"
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
        />
        <button
          className="btn btn-primary join-item"
          onClick={handleSendMessage}
        >
          SEND
        </button>
      </div>
    </div>
  );
}
