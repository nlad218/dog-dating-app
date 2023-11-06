export default function Footer({ children }) {
	return (
		<div
			className="bg-secondary text-primary-content flex md:hidden flex-row justify-center align-center min-w-full fixed bottom-0 rounded-t-xl p-4"
			style={{ borderTop: "3px solid #000", borderRadius: "0 0 10px 10px" }}
		>
			{children}
		</div>
	);
}
