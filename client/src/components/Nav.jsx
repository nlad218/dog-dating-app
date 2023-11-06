import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import React, { useState } from "react";

export default function Nav() {
	const [showAlert, setShowAlert] = useState(false);

	const navLinks = [
		{
			name: "Home",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
					/>
				</svg>
			),

			path: "/",
		},
		{
			name: "Matches",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
					/>
				</svg>
			),
			path: "/matches",
		},
		{
			name: "Profile",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
			),
			path: "/profile",
		},
	];

	const isLoggedIn = Auth.loggedIn();

	return (
		<div>
			{showAlert && (
				<div className="fixed text-center top-20 left-0 right-0 mx-auto w-64 alert alert-error">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="stroke-current shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>Login required!</span>
				</div>
			)}
			<nav className="flex flex-row justify-around gap-4 w-full text-2xl font-semibold">
				{navLinks.map(({ name, icon, path }, index) =>
					isLoggedIn ? (
						<Link to={path} key={index}>
							<div className="md:hidden text-black hover:text-primary mr-10 ml-10">
								{icon}
							</div>
							<div className="hidden md:block hover:text-primary">{name}</div>
						</Link>
					) : (
						<div
							key={index}
							onClick={(e) => {
								e.preventDefault();

								setShowAlert(true);

								setTimeout(() => {
									setShowAlert(false);
								}, 2000);
							}}
						>
							<div className="md:hidden text-black hover:text-primary mr-5 ml-5">
								{icon}
							</div>
							<div className="hidden md:block hover:text-primary">{name}</div>
						</div>
					)
				)}
			</nav>
		</div>
	);
}
