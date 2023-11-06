import { useState } from "react";
import MatchesList from "../components/MatchesList";
import ActiveMatch from "../components/ActiveMatch";
import SingleMatchProfile from "../components/SingleMatchProfile";
import Auth from "../utils/auth";

export default function Chat() {
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
					marginTop: "1rem",
				}}
			>
				{!loggedIn && window.location.assign("/")}
				<input id="my-drawer" type="checkbox" className="drawer-toggle" />

				<div className="drawer-content flex flex-col items-center justify-start ml-4">
					<ActiveMatch active={activeConversation} profileView={profileView}>
						<label
							htmlFor="my-drawer"
							className="drawer-button bg-primary rounded-full p-2 md:hidden"
						>
							&lt;
						</label>
					</ActiveMatch>
				</div>
				<div className="drawer-side h-full max-md:z-50">
					<label
						htmlFor="my-drawer"
						aria-label="close sidebar"
						className="drawer-overlay md:hidden"
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
