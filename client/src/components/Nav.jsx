import React, { useState } from "react";

export default function Nav() {
	return (
		<nav className="flex flex-row justify-around gap-4 w-full text-2xl font-semibold">
			<div>Home</div>
			<div>Chat</div>
			<div>Profile</div>
		</nav>
	);
}
