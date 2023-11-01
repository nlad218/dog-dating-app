import { Link } from "react-router-dom";

export default function Nav() {
	const navLinks = [
		{
			name: "Main",
			path: "/main",
		},
		{
			name: "Chat",
			path: "/chat",
		},
		{
			name: "Profile",
			path: "/profile",
		},
	];
	return (
		<nav className="flex flex-row justify-around gap-4 w-full text-2xl font-semibold">
			{navLinks.map(({ name, path }, index) => (
				<Link to={path} key={index}>
					{name}
				</Link>
			))}
		</nav>
	);
}
//COmment
