export default function ConversationList(props) {
  return (
    <ul className="menu">
      {props.names.map((name, index) => (
        <li key={index}>
          <div
            className={
              index == 2
                ? "items-start flex flex-col active"
                : "items-start flex flex-col"
            }
          >
            <div className="text-xl font-semibold">{name}</div>
            <div>This is an example message</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
