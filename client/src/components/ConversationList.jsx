export default function ConversationList(props) {
  return (
    <>
      {props.names.map((name, index) => {
        {(index === props.active) ? <div>active</div> : <div>{name}</div> }
      })}
    </>
  )
}
