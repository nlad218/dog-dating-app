import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN, CREATE_USER } from "../utils/mutations";
import Auth from "../utils/auth";

export default function LoginModal({ isOpen, onClose }) {
	const [login] = useMutation(LOGIN);
	const [signUp] = useMutation(CREATE_USER);

	const [activeTab, setActiveTab] = useState("login");

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [errorText, setErrorText] = useState(false);
	const [dupeText, setDupeText] = useState(false);
	const [invalidText, setInvalidText] = useState(false);

	const passwordRegex =
		/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

	const handleTabClick = (tab) => {
		setActiveTab(tab);
		setEmail("");
		setPassword("");
		setName("");
		setErrorText(false);
		setDupeText(false);
		setInvalidText(false);
	};

	const handleLogin = async (e) => {
		e.preventDefault();

		setInvalidText(false);

		try {
			const { data } = await login({
				variables: {
					email,
					password,
				},
			});
			Auth.login(data.login.token);
		} catch (err) {
			console.error(err);
			setInvalidText(true);
		}
	};

	const handleSignUp = async (e) => {
		e.preventDefault();

		setErrorText(false);
		setDupeText(false);

		if (passwordRegex.test(password) && emailRegex.test(email)) {
			setErrorText(false);
			try {
				const { data } = await signUp({
					variables: {
						ownerName: name,
						email,
						password,
					},
				});
				Auth.signUp(data.createUser.token);
				window.location.href = "/profile";
			} catch (err) {
				console.error(err);
				setDupeText(true);
			}
		} else {
			setErrorText(true);
		}
	};

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	return (
		<>
			<div className="modal-container mx-2 sm:mx-0">
				<div className="bg-base-100 w-full sm:w-96 rounded-lg shadow-lg p-4">
					<div className="flex justify-between">
						<label
							htmlFor="my_modal_login"
							className="text-black-600 text-2xl hover:cursor-pointer hover:scale-110"
						>
							[&times;]
						</label>
					</div>
					<div className="mt-4">
						{activeTab === "login" && (
							<h1 className="mb-3 text-black-700 text-center text-2xl">
								Welcome Back!
							</h1>
						)}
						{activeTab === "signup" && (
							<h1 className="mb-3 text-black-700 text-center text-2xl">
								Join Now!
							</h1>
						)}
						<ul className="flex justify-around">
							<li>
								<button
									className={` text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline${
										activeTab === "login"
											? "text-white bg-info"
											: "text-white bg-primary hover:bg-info hover:text-white"
									}`}
									onClick={() => handleTabClick("login")}
								>
									Login
								</button>
							</li>
							<li>
								<button
									className={` text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline${
										activeTab === "signup"
											? "text-white bg-info"
											: "text-white bg-primary hover:bg-info hover:text-white"
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
							<h2
								className={
									invalidText === false ? "hidden" : "text-center text-red-700"
								}
							>
								Invalid email or password!
							</h2>
							<form onSubmit={handleLogin}>
								<div className="mb-4">
									<label
										className="block text-black-700 text-sm font-bold mb-2"
										htmlFor="LoginEmail"
									>
										Email
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
										id="LoginEmail"
										type="email"
										placeholder="Email"
										value={email}
										onChange={handleEmailChange}
									/>
								</div>
								<div className="mb-4">
									<label
										className="block text-black-700 text-sm font-bold mb-2"
										htmlFor="LoginPassword"
									>
										Password
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
										id="LoginPassword"
										type="password"
										placeholder="Password"
										value={password}
										onChange={handlePasswordChange}
									/>
								</div>
								<div className="flex items-center justify-center">
									<button
										className="bg-primary hover:bg-info text-black hover:text-white font-bold py-2 px-4 rounded focus-outline-none focus-shadow-outline"
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
							<h2
								className={
									errorText === false ? "hidden" : "text-center text-red-700"
								}
							>
								Password does not meet requirements!
							</h2>
							<h2
								className={
									dupeText === false ? "hidden" : "text-center text-red-700"
								}
							>
								Email already in use!
							</h2>
							<form onSubmit={handleSignUp}>
								<div className="mb-4">
									<label
										className="block text-black-700 text-sm font-bold mb-2"
										htmlFor="SignUpEmail"
									>
										Email
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
										id="SignUpEmail"
										type="email"
										placeholder="Email"
										value={email}
										onChange={handleEmailChange}
									/>
								</div>
								<div className="mb-4">
									<label
										className="block text-black-700 text-sm font-bold mb-2"
										htmlFor="name"
									>
										Name
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
										id="name"
										type="text"
										placeholder="Name"
										value={name}
										onChange={handleNameChange}
									/>
								</div>
								<div className="mb-4">
									<label
										className="text-black-700 text-sm font-bold mb-2 flex items-center"
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
										className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
										id="SignUpPassword"
										type="password"
										placeholder="Password"
										value={password}
										onChange={handlePasswordChange}
									/>
								</div>
								<div className="flex items-center justify-center">
									<button
										className="bg-primary hover:bg-info text-black hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
		</>
	);
}
