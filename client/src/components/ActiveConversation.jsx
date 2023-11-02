import { useState } from "react";

export default function ActiveConversation(props) {
  const [newMessage, setNewMessage] = useState("");

  const messages = [
    { sender: false, content: "Hello there!" },
    { sender: true, content: "Hello there!" },
    { sender: false, content: "Hello there!" },
    { sender: true, content: "Hello there!" },
    { sender: false, content: "Hello there!" },
  ];

  function handleSendMessage(event) {
    event.preventDefault();
    setNewMessage("");
  }

  return (
    <div className="w-full min-h-fit rounded-xl bg-base-200 shadow-xl">
      <div className="text-2xl bg-primary text-primary-content font-semibold rounded-t-xl flex flex-row gap-4">
        <div className="p-2">{props.children}</div>
        <h1 className="p-2">(NAME)</h1>
      </div>
      <div className="text-lg lg:text-2xl py-4">
        {messages.map((message, index) => (
          <div
            className={message.sender ? "chat chat-end" : "chat chat-start"}
            key={index}
          >
            <div
              className={
                message.sender
                  ? "chat-bubble chat-bubble-primary"
                  : "chat-bubble"
              }
            >
              {message.content}
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
