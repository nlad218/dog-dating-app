import { useState, useEffect } from "react";
import ConversationList from "../components/ConversationList";
import ActiveConversation from "../components/ActiveConversation";
import Auth from "../utils/auth";

export default function Chat() {
  // This page will need to:
  // - Query the server for the user's connections
  // - Query the server for some amount of messages for EVERY chat (at least the single most recent & when it was sent)
  // - Query the server for and/or cache some amount of messages for the active conversation
  // - Keep track of the active conversation
  const [activeConversation, setActiveConversation] = useState("");
  const loggedIn = Auth.loggedIn();
  
  return (
    <div className="drawer md:drawer-open gap-4">
      {!loggedIn && window.location.assign("/")}
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col items-center justify-start min-h-fit max-h-full">
        <ActiveConversation active={activeConversation}>
          <label
            htmlFor="my-drawer"
            className="drawer-button bg-primary-focus rounded-full p-2 md:hidden"
          >
            &lt;
          </label>
        </ActiveConversation>
      </div>
      <div className="drawer-side max-md:z-50">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="p-4 w-80 max-md:min-h-full md:min-h-fit max-h-full bg-base-200 text-base-content rounded-r-xl md:rounded-l-xl md:shadow-xl">
          <ConversationList
            active={activeConversation}
            setActive={setActiveConversation}
          />
        </div>
      </div>
    </div>
  );
}
