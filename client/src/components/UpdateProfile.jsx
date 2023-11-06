import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../utils/mutations";
import Auth from "../utils/auth";

export default function UpdateProfileModal({
	isOpen,
	onClose,
	userData1,
	setNewUserData1,
	refetch,
}) {
	const [update] = useMutation(UPDATE_USER);
	const [activeTab, setActiveTab] = useState("owner");
	const [newUserData, setNewUserData] = useState({
		hobbies: ["", "", ""], // Initialize an array with three empty strings
	});

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	const handleSaveProfile = async (e) => {
		e.preventDefault();
		try {
			console.log(newUserData);
			Object.entries(newUserData).forEach(([key, value]) => {
				if (value) {
					setNewUserData1((prevUserData1) => ({
						...prevUserData1,
						[key]: value,
					}));
				}
			});
			const { data } = await update({
				variables: {
					ownerName: Auth.getProfile().data.ownerName,
					hobbies: newUserData.hobbies, // Use the hobbies array directly
					...newUserData,
				},
			});

			setNewUserData({
				hobbies: ["", "", ""], // Reset the hobbies array after saving
			});

			onClose(); // Close the modal
			refetch();
		} catch (error) {
			console.error(error);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		const newData = { ...newUserData };

		if (name === "hobby") {
			const dataIndex = parseInt(e.target.getAttribute("data-index"));
			newData.hobbies[dataIndex] = value;
		} else {
			newData[name] = name === "age" ? parseInt(value) : value;
		}
		setNewUserData(newData);
	};

	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center overflow-none ${
				isOpen ? "block" : "hidden"
			}`}
		>
			<div className="modal-container mx-2 sm:mx-0">
				<div className="bg-gray-600 w-full sm:w-96 rounded-lg shadow-lg p-4">
					<div className="flex justify-between">
						<button className="text-white-600 text-2xl" onClick={onClose}>
							&times;
						</button>
					</div>
					<div className="mt-4 mb-4">
						{activeTab === "owner" && (
							<h1 className="mb-3 text-white-700 text-center text-2xl">
								Update Your Profile Below
							</h1>
						)}
						{activeTab === "pup" && (
							<h1 className="mb-3 text-white-700 text-center text-2xl">
								Update Your Pup's Profile Below
							</h1>
						)}
						<ul className="flex justify-around">
							<li>
								<button
									className={` text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline${
										activeTab === "owner"
											? "text-white bg-info"
											: "text-white bg-primary hover:bg-info hover:text-white"
									}`}
									onClick={() => handleTabClick("owner")}
								>
									Owner
								</button>
							</li>
							<li>
								<button
									className={` text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline${
										activeTab === "pup"
											? "text-white bg-info"
											: "text-white bg-primary hover:bg-info hover:text-white"
									}`}
									onClick={() => handleTabClick("pup")}
								>
									Pup
								</button>
							</li>
							<li>
								<button
									className={` text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline${
										activeTab === "hobbies"
											? "text-white bg-info"
											: "text-white bg-primary hover:bg-info hover:text-white"
									}`}
									onClick={() => handleTabClick("hobbies")}
								>
									Hobbies
								</button>
							</li>
						</ul>
					</div>
					{activeTab === "owner" && (
						<form className="mb-3" onSubmit={handleSaveProfile}>
							<div className="m-2">
								<label
									className="block text-black-700 text-sm font-bold mb-2"
									htmlFor="newEmail"
								>
									Updated Email
								</label>
								<input
									type="text"
									className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
									placeholder="New Email"
									name="email"
									value={newUserData.email || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="m-2">
								<label
									className="block text-black-700 text-sm font-bold mb-2"
									htmlFor="ownerName"
								>
									Updated Name
								</label>
								<input
									type="text"
									className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
									placeholder="New name"
									name="ownerName"
									value={newUserData.ownerName || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="m-2">
								<label
									className="block text-black-700 text-sm font-bold mb-2"
									htmlFor="newPassword"
								>
									Updated Password
								</label>
								<input
									type="password"
									className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
									placeholder="New Password"
									name="password"
									value={newUserData.password || ""}
									onChange={handleInputChange}
								/>
							</div>
						</form>
					)}
					{activeTab === "pup" && (
						<form className="mb-3" onSubmit={handleSaveProfile}>
							<div className="m-2">
								<label
									className="block text-black-700 text-sm font-bold mb-2"
									htmlFor="dogName"
								>
									Dog Name
								</label>
								<input
									type="text"
									className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
									placeholder="New Dog Name"
									name="dogName"
									value={newUserData.dogName || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="m-2">
								<label
									className="block text-black-700 text-sm font-bold mb-2"
									htmlFor="breed"
								>
									Breed
								</label>
								<input
									type="text"
									placeholder="New Breed"
									className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
									name="breed"
									value={newUserData.breed || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="m-2">
								<label
									className="block text-black-700 text-sm font-bold mb-2"
									htmlFor="age"
								>
									Age
								</label>
								<input
									type="number"
									placeholder="New Age"
									className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
									name="age"
									value={newUserData.age || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="m-2">
								<label className="block text-black-700 text-sm font-bold mb-2">
									Size
								</label>
								<select
									style={{ color: "black" }}
									value={newUserData.size || ""}
									onChange={handleInputChange}
									name="size"
								>
									<option value="Small">Small</option>
									<option value="Medium">Medium</option>
									<option value="Large">Large</option>
								</select>
							</div>
							<div className="m-2">
								<label
									className="block text-black-700 text-sm font-bold mb-2"
									htmlFor="about"
								>
									Bio
								</label>
								<textarea
									type="textarea"
									placeholder="New Bio"
									className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
									name="about"
									value={newUserData.about || ""}
									onChange={handleInputChange}
								/>
							</div>
						</form>
					)}
					{activeTab === "hobbies" && (
						<form className="mb-3" onSubmit={handleSaveProfile}>
							{newUserData.hobbies.map((hobby, index) => (
								<div className="m-2" key={index}>
									<label
										className="block text-black-700 text-sm font-bold mb-2"
										htmlFor={`hobby-${index}`}
									>
										Hobby #{index + 1}
									</label>
									<input
										type="text"
										className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
										placeholder={`Hobby #${index + 1}`}
										name="hobby"
										data-index={index}
										value={hobby}
										onChange={handleInputChange}
									/>
								</div>
							))}
						</form>
					)}
					<div className="flex items-center justify-center">
						<button
							className="text-white bg-primary hover:bg-info hover:text-white font-semibold py-2 px-4"
							onClick={handleSaveProfile}
						>
							Save Profile
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
