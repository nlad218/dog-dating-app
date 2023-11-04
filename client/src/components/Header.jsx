import { Link } from "react-router-dom";

export default function Header({ children }) {
	return (
		<header
			className="flex flex-row items-center justify-center md:justify-between p-4 sticky top-0 min-w-full bg-secondary text-primary-content rounded-b-xl z-10"
			style={{ borderBottom: "3px solid #000", borderRadius: "0 0 10px 10px" }}
		>
			<Link className="text-black text-5xl md:text-4xl font-bold" to="/">
				Snif
			</Link>
			<div className="hidden md:inline max-w-xl">{children}</div>
		</header>
	);
}
