export default function ConversationList({ names, active, set }) {
  return (
    <ul className="menu">
      {names.map((name, index) => (
        <li key={index} onClick={() => set(index)}>
          <div
            className={
              index == active
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
