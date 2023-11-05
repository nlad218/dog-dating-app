import { useState } from "react";
import MatchesList from "../components/MatchesList";
import ActiveMatch from "../components/ActiveMatch";
import SingleMatchProfile from "../components/SingleMatchProfile";
import Auth from "../utils/auth";

export default function Chat() {
	// This page will need to:
	// - Query the server for the user's connections
	// - Query the server for some amount of messages for EVERY chat (at least the single most recent & when it was sent)
	// - Query the server for and/or cache some amount of messages for the active conversation
	// - Keep track of the active conversation

	const [activeConversation, setActiveConversation] = useState("");
	const [profileView, setProfileView] = useState(false);
	const loggedIn = Auth.loggedIn();

	return (
		<>
			<div
				className="drawer md:drawer-open"
				style={{
					paddingRight: "1rem",
					paddingLeft: "1rem",
					paddingBottom: "4rem",
					marginBottom: "2rem",
					marginTop: "1rem",
				}}
			>
				{!loggedIn && window.location.assign("/")}
				<input id="my-drawer" type="checkbox" className="drawer-toggle" />

				<div className="drawer-content flex flex-col items-center justify-start">
					<ActiveMatch active={activeConversation} profileView={profileView}>
						<label
							htmlFor="my-drawer"
							className="drawer-button bg-primary rounded-full p-2 md:hidden"
						>
							&lt;
						</label>
					</ActiveMatch>
				</div>
				<div className="drawer-side max-md:z-50">
					<label
						htmlFor="my-drawer"
						aria-label="close sidebar"
						className="drawer-overlay"
					>
						&lt;
					</label>
					<div className="p-4 w-60 max-md:min-h-full md:min-h-fit max-h-screen bg-base-200 text-base-content rounded-r-xl md:rounded-l-xl md:shadow-xl">
						<MatchesList
							active={activeConversation}
							setActive={setActiveConversation}
							profileView={profileView}
							setProfileView={setProfileView}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
