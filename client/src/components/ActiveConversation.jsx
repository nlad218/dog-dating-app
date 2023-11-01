export default function ActiveConversation(props) {
  const messages = [
    { sender: false, content: "Hello there!" },
    { sender: true, content: "Hello there!" },
    { sender: false, content: "Hello there!" },
    { sender: true, content: "Hello there!" },
    { sender: false, content: "Hello there!" },
  ];

  return (
    <div className="w-full min-h-full rounded-xl bg-base-200">
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
    </div>
  );
}
