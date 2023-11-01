import { useState } from "react";
import ConversationList from "../components/ConversationList";
import ActiveConversation from "../components/ActiveConversation";

export default function Chat() {
  // This page will need to:
  // - Query the server for the user's connections
  // - Query the server for some amount of messages for EVERY chat (at least the single most recent & when it was sent)
  // - Query the server for and/or cache some amount of messages for the active conversation
  // - Keep track of the active conversation
  // - Possibly open a websocket for the current conversation?

  const [activeConversation, setActiveConversation] = useState(0);

  const tempNameList = ["Nick F", "Nick D", "Jake", "Maya", "Josh"];

  return (
    <div className="drawer md:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <ActiveConversation>
          <label
            htmlFor="my-drawer"
            className="drawer-button bg-primary-focus rounded-full p-2 md:hidden"
          >
            &lt;
          </label>
        </ActiveConversation>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <ConversationList
            names={tempNameList}
            active={activeConversation}
            set={setActiveConversation}
          />
        </ul>
      </div>
    </div>
  );
}
