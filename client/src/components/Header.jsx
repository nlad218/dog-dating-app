import { Link } from "react-router-dom";

export default function Header({ children }) {
	return (
		<header className="flex flex-row items-center justify-center md:justify-between p-4 sticky top-0 min-w-full bg-primary text-primary-content rounded-b-xl">
			<Link
				className="text-primary-content text-5xl md:text-4xl font-bold"
				to="/"
			>
				Snif
			</Link>
			<div className="hidden md:inline max-w-xl">{children}</div>
		</header>
	);
}
// comment
