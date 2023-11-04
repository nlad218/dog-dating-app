import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../utils/mutations";
import Auth from "../utils/auth";

export default function UpdateProfileModal({ isOpen, onClose }) {
  const [update] = useMutation(UPDATE_USER);
  const [activeTab, setActiveTab] = useState("owner");
  const [newUserData, setNewUserData] = useState({});

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const sendData = {};
      Object.entries(newUserData).forEach(([key, value]) => {
        if (value) {
          sendData[key] = value;
        }
      });
      const { data } = await update({
        variables: {
          ownerName: Auth.getProfile().data.ownerName,
          ...sendData,
        },
      });

      setNewUserData({});

      onClose(); // Close the modal
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...newUserData };
    newData[name] = name === "age" ? parseInt(value) : value.trim();
    setNewUserData(newData);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-none ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="modal-container mx-2 sm:mx-0">
        <div className="bg-primary w-full sm:w-96 rounded-lg shadow-lg p-4">
          <div className="flex justify-between">
            <button className="text-white-600 text-2xl" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="mt-4">
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
                      ? "text-secondary bg-secondary"
                      : "text-accent bg-blue-600 hover:bg-blue-700"
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
                      ? "text-secondary bg-secondary"
                      : "text-accent bg-blue-600 hover:bg-blue-700"
                  }`}
                  onClick={() => handleTabClick("pup")}
                >
                  Pup
                </button>
              </li>
            </ul>
          </div>
          {activeTab === "owner" && (
            <form onSubmit={handleSaveProfile}>
              <input
                type="text"
                placeholder="New Email"
                name="email"
                value={newUserData.email || ""}
                onChange={handleInputChange}
              />
              <input
                type="password"
                placeholder="New Password"
                name="password"
                value={newUserData.password || ""}
                onChange={handleInputChange}
              />
            </form>
          )}
          {activeTab === "pup" && (
            <form onSubmit={handleSaveProfile}>
              <input
                type="text"
                placeholder="New Dog Name"
                name="dogName"
                value={newUserData.dogName || ""}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="New Breed"
                name="breed"
                value={newUserData.breed || ""}
                onChange={handleInputChange}
              />
              <input
                type="number"
                placeholder="New Age"
                name="age"
                value={newUserData.age || ""}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="New Size"
                name="size"
                value={newUserData.size || ""}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="New About"
                name="about"
                value={newUserData.about || ""}
                onChange={handleInputChange}
              />
            </form>
          )}
          <div className="flex items-center justify-center">
            <button
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
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
