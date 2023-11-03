import { useState } from "react";
import { QUERY_MATCH_MESSAGES } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";

export default function ActiveConversation({ active, children }) {
  const [newMessage, setNewMessage] = useState("");
  //TODO: This is returning a 400 bad request and I don't know why at all.
  const { data, loading, err } = useQuery(QUERY_MATCH_MESSAGES, {
    variables: {
      matchId: active,
    },
  });

  if (active == "") return "Select a conversation...";

  if (loading) return "loading...";
  if (err) return `Error! ${err}`;

  const selfId = Auth.getProfile()._id;
  const messages = data?.messages || [];

  function handleSendMessage(event) {
    event.preventDefault();
    // USE MUTATION TO ADD A MESSAGE TO THE CONVERSATION
    setNewMessage("");
  }

  return (
    <div className="w-full min-h-fit rounded-xl bg-base-200 shadow-xl">
      <div className="text-2xl bg-primary text-primary-content font-semibold rounded-t-xl flex flex-row gap-4">
        <div className="p-2">{children}</div>
        <h1 className="p-2">Stranger</h1>
      </div>
      <div className="text-lg lg:text-2xl py-4">
        {messages.map((message) => (
          <div
            className={
              message.user._id === selfId ? "chat chat-end" : "chat chat-start"
            }
            key={message._id}
          >
            <div
              className={
                message.user._id === selfId
                  ? "chat-bubble chat-bubble-primary"
                  : "chat-bubble"
              }
            >
              {message.messageText}
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
