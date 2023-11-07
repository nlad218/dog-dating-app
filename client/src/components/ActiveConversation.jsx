import { useState, useEffect, useRef } from "react";
import { QUERY_MATCH_MESSAGES } from "../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_MESSAGE } from "../utils/mutations";
import Auth from "../utils/auth";

export default function ActiveConversation({ active, children }) {
  const [newMessage, setNewMessage] = useState("");
  const [createMessage] = useMutation(CREATE_MESSAGE);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  });
  let { data, loading, err } = useQuery(QUERY_MATCH_MESSAGES, {
    variables: {
      matchId: active,
    },
    pollInterval: 500,
  });

  if (active == "") return "Select a conversation...";

  if (loading) return <span className="loading loading-ball loading-lg"></span>;
  if (err) return `Error! ${err}`;

  const selfId = Auth.getProfile().data._id;
  const messages = data?.oneMatch.messages || [];
  function handleSendMessage(event) {
    event.preventDefault();
    createMessage({
      variables: { messageText: newMessage, matchId: active },
    });
    setNewMessage("");
  }

  return (
    <div className="w-full min-h-fit rounded-xl bg-base-200 shadow-xl">
      <div className="text-2xl bg-primary text-primary-content font-semibold rounded-t-xl flex flex-row gap-4">
        <div className="p-2 ">{children}</div>
        {data.oneMatch.user1._id == selfId ? (
          <h1 className="p-2">{data.oneMatch.user2.ownerName}</h1>
        ) : (
          <h1 className="p-2">{data.oneMatch.user1.ownerName}</h1>
        )}
      </div>
      <div className="text-lg lg:text-2xl py-4" key="mapping">
        {messages.map((message, index) => (
          <div
            className={
              message.user._id === selfId ? "chat chat-end" : "chat chat-start"
            }
            key={index}
          >
            <div
              className={
                message.user._id === selfId
                  ? "chat-bubble chat-bubble-secondary"
                  : "chat-bubble"
              }
              key={message._id}
            >
              {message.messageText}
            </div>
          </div>
        ))}
      </div>
      <div className="p-2 join w-full" ref={messagesEndRef}>
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
