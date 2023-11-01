export default function ActiveConversation(props) {
  const messages = [
    { sender: false, content: "Hello there!" },
    { sender: true, content: "Hello there!" },
    { sender: false, content: "Hello there!" },
    { sender: true, content: "Hello there!" },
    { sender: false, content: "Hello there!" },
  ];

  return (
    <div className="w-full min-h-full">
      {messages.map((message, index) => (
      <div className={message.sender ? "chat chat-end" : "chat chat-start"} key={index}>
        <div className={message.sender ? "chat-bubble chat-bubble-primary" : "chat-bubble"}>{message.content}</div>
      </div>
      ))}
    </div>
  )
}
