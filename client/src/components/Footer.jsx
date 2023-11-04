export default function Footer({ children }) {
	return (
		<div className="bg-neutral text-primary-content flex md:hidden flex-row justify-center align-center min-w-full fixed bottom-0 rounded-t-xl p-4">
			{children}
		</div>
	);
}
