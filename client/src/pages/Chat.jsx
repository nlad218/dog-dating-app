import { useState } from "react"
import ConversationList from "../components/ConversationList";
import ActiveConversation from "../components/ActiveConversation";

export default function Chat() {
  // This page will need to:
  // - Query the server for the user's connections
  // - Query the server for some amount of messages for EVERY chat (at least the single most recent & when it was sent)
  // - Query the server for and/or cache some amount of messages for the active conversation
  // - Keep track of the active conversation
  // - Possibly open a websocket for the current conversation?

  const [activeConversation, setActiveConversation] = useState(0)

  const tempNameList = ["Nick F", "Nick D", "Jake", "Maya", "Josh"]

  return (
    <div className="bg-base-100 shadow-xl rounded-xl max-w-5xl">
      <div>
        THIS WILL APPEAR ABOVE THE LIST OF CONVERSATIONS
        <ConversationList names={tempNameList} activeConversation={activeConversation} setActiveConversation={setActiveConversation} />
      </div>
      <div>
        THIS WILL APPEAR ABOVE THE ACTIVE CONVERSATION
        <ActiveConversation />
      </div>
    </div>
  )
}
