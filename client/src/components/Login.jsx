import React, { useState } from "react";

export default function LoginModal({ isOpen, onClose }) {
	const [activeTab, setActiveTab] = useState("login");

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center overflow-auto ${
				isOpen ? "block" : "hidden"
			}`}
		>
			<div className="modal-container">
				<div className="bg-primary w-96 rounded-lg shadow-lg p-4">
					<div className="flex justify-between">
						<button className="text-white-600 text-2xl" onClick={onClose}>
							&times;
						</button>
					</div>
					<div className="mt-4">
						{activeTab === "login" && (
							<h1 className="mb-3 text-white-700 text-center text-2xl">
								Welcome Back!
							</h1>
						)}
						{activeTab === "signup" && (
							<h1 className="mb-3 text-white-700 text-center text-2xl">
								Join Now!
							</h1>
						)}
						<ul className="flex justify-around">
							<li>
								<button
									className={` text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline${
										activeTab === "login"
											? "text-secondary bg-secondary"
											: "text-accent bg-blue-600 hover:bg-blue-700"
									}`}
									onClick={() => handleTabClick("login")}
								>
									Login
								</button>
							</li>
							<li>
								<button
									className={` text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline${
										activeTab === "signup"
											? "text-secondary bg-secondary"
											: "text-accent bg-blue-600 hover:bg-blue-700"
									}`}
									onClick={() => handleTabClick("signup")}
								>
									Sign Up
								</button>
							</li>
						</ul>
					</div>
					{activeTab === "login" && (
						<div className="mt-4">
							<form>
								<div className="mb-4">
									<label
										className="block text-white-700 text-sm font-bold mb-2"
										htmlFor="LoginEmail"
									>
										Email
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										id="LoginEmail"
										type="email"
										placeholder="Email"
									/>
								</div>
								<div className="mb-4">
									<label
										className="block text-white-700 text-sm font-bold mb-2"
										htmlFor="LoginPassword"
									>
										Password
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										id="LoginPassword"
										type="password"
										placeholder="Password"
									/>
								</div>
								<div className="flex items-center justify-center">
									<button
										className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
										type="submit"
									>
										Log In
									</button>
								</div>
							</form>
						</div>
					)}
					{activeTab === "signup" && (
						<div className="mt-4">
							<form>
								<div className="mb-4">
									<label
										className="block text-white-700 text-sm font-bold mb-2"
										htmlFor="SignUpEmail"
									>
										Email
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
										id="SignUpEmail"
										type="email"
										placeholder="Email"
									/>
								</div>
								<div className="mb-4">
									<label
										className="text-white-700 text-sm font-bold mb-2 flex items-center"
										htmlFor="SignUpPassword"
									>
										Password
										<div
											className="tooltip ml-2"
											data-tip="Password must be more than 8 characters, includes one number, and one special character."
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="currentColor"
												className="w-4 h-4"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
												/>
											</svg>
										</div>
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
										id="SignUpPassword"
										type="password"
										placeholder="Password"
									/>
								</div>
								<div className="flex items-center justify-center">
									<button
										className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
										type="submit"
									>
										Sign Up
									</button>
								</div>
							</form>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
// comment
