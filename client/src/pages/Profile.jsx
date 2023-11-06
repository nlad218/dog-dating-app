import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SELF_PROFILE } from "../utils/queries";
import Auth from "../utils/auth";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { UPDATE_USER, DELETE_USER } from "../utils/mutations";
import UpdateProfileModal from "../components/UpdateProfile";

export default function Profile() {
	const [imageId, setImageId] = useState("loading_znoemz");
	const { error, loading, data } = useQuery(QUERY_SELF_PROFILE, {
		onCompleted: (data) => {
			setImageId(data.me.image);
			setNewUserData1(data.me);
		},
		pollInterval: 5000
	});
	const [update] = useMutation(UPDATE_USER);
	const [userData1, setNewUserData1] = useState({});
	const userData = data?.me || {};
	const [isModalOpen, setModalOpen] = useState(false);
	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	// Create a Cloudinary instance and set your cloud name.
	const cld = new Cloudinary({
		cloud: {
			cloudName: "dkxtk2v4z",
		},
	});
	const cloudinaryRef = useRef();
	const widgetRef = useRef();
	useEffect(() => {
		cloudinaryRef.current = window.cloudinary;
		// console.log(cloudinaryRef.current);
		widgetRef.current = cloudinaryRef.current.createUploadWidget(
			{
				cloudName: "dkxtk2v4z",
				uploadPreset: "dogprofile_test",
			},
			async function (error, result) {
				if (result.info.public_id) {
					setImageId(result.info.public_id);
					const { updatedData } = await update({
						variables: {
							image: result.info.public_id,
						},
					});
				}
			}
		);
	});

	// Instantiate a CloudinaryImage object for the image with the public ID, 'docs/models'.
	const myImage = cld.image(imageId);
	// Resize to 250 x 250 pixels using the 'fill' crop mode.
	// myImage.resize(fill().width(700).height(400));

	const handleLogout = () => {
		Auth.logout();
		window.location.assign("/");
	};
	const [showDetailsProfile, setShowDetailsProfile] = useState(false);
	const [deleteProfile] = useMutation(DELETE_USER);

	const handleDelete = async () => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete your profile? This action cannot be undone."
		);

		if (confirmDelete) {
			try {
				const { data } = await deleteProfile({
					variables: {
						userId: userData._id,
					},
				});

				if (data.deleteUser) {
					console.log("Profile deleted successfully.");

					Auth.logout();
					window.location.assign("/");
				} else {
					console.error("Failed to delete the profile.");
				}
			} catch (error) {
				console.error("Error deleting profile:", error);
			}
		}
	};
	const toggleDetailsProfile = () => {
		setShowDetailsProfile(!showDetailsProfile);
	};
	if (loading) {
		return <span className="loading loading-ball loading-lg"></span>;
	}
	if (error) {
		return <div>{error.message}</div>;
	}
	console.log(userData1)
	return (
		<>
		<div className="card lg:card-side bg-base-100 shadow-xl mainDiv"> 
			<figure className = "imageDiv">
			<AdvancedImage cldImg={myImage} className="border border-white h-full imageStyle" />
			</figure>
			<div className="card-body bg-primary overflow-auto infoDiv" >
				<h2 className="cardTitle">
				Profile:
				</h2>
				<h3 className="card-subtitle text-white breed">
				Owner Name: {userData1.ownerName}
				</h3>
				<h3 className="card-subtitle text-white breed">
				Dog Name: {userData1.dogName}
				</h3>
				<div>
						<button
							onClick={toggleDetailsProfile}
							className="md:hidden text-white cursor-pointer"
						>
							More Details ⇩
						</button>
						<div className={`md:block ${showDetailsProfile ? "block" : "hidden"}`}>
							<h4 className="text-white mb-2 details"><u>Size</u>:  {userData1.size}</h4>
							<h4 className="text-white mb-2 details"><u>Bio</u>: {userData1.about}</h4>
							<h4 className="text-white mb-2 details">
							<u>Hobbies</u>:
								<ul>
									{/* {userData1.hobbies.map((hobby, index) => (
										<li key={index}
											className = "cardLi"
										>
											<h4>{hobby}</h4>
										</li>
									))} */}
								</ul>
							</h4>
						</div>
					</div>
				<div className="card-actions w-full profileButtonDiv">
					<button
						className="profileButton bg-white hover:bg-gray-500 text-gray-800 font-semibold py-2 px-4 border-2 border-black rounded shadow"
						onClick={openModal}
					>
						Edit Profile
					</button>
					<button
						onClick={() => widgetRef.current.open()}
						className="profileButton bg-white hover:bg-gray-500 text-gray-800 font-semibold py-2 px-4 border-2 border-black rounded shadow"
					>
						Upload Dog Image
					</button>
					<button
						onClick={handleLogout}
						className="profileButton bg-white hover:bg-gray-500 text-gray-800 font-semibold py-2 px-4 border-2 border-black rounded shadow"
					>
						Logout
					</button>
					<button
						onClick={handleDelete}
						className="profileButton bg-white hover:bg-gray-500 text-gray-800 font-semibold py-2 px-4 border-2 border-black rounded shadow"
					>
						Delete
					</button>
				</div>
			</div>
			<UpdateProfileModal
				isOpen={isModalOpen}
				onClose={closeModal}
				userData1={userData1}
				setNewUserData1={setNewUserData1}
			/>
		</div>
		
		</>
		// <div
		// 	style={{
		// 		paddingRight: "1rem",
		// 		paddingLeft: "1rem",
		// 		paddingBottom: "4rem",
		// 		marginBottom: "2rem",
		// 	}}
		// >
		// 	<div className="card bg-primary md:p-16 lg:p-16 xl:p-20 mt-3 border-2 border-black">
		// 		<div className="card-body text-white">
		// 			<AdvancedImage cldImg={myImage} className="block" />
		// 			<h2 className="mb-2 text-black">Owner Name: {userData1.ownerName}</h2>
		// 			<h3 className="mb-2 text-black">Dog Name: {userData1.dogName}</h3>
		// 			<h3 className="mb-2 text-black">Breed: {userData1.breed}</h3>
		// 			<h3 className="mb-2 text-black">Age: {userData1.age} years old</h3>
		// 			<h3 className="mb-2 text-black">Size: {userData1.size}</h3>
		// 			<h3 className="text-black">About: {userData1.about}</h3>
		// 			<button
		// 				className="bg-white hover:bg-gray-500 text-gray-800 font-semibold py-2 px-4 border-2 border-black rounded shadow"
		// 				onClick={openModal}
		// 			>
		// 				Edit Profile
		// 			</button>
		// 			<button
		// 				onClick={() => widgetRef.current.open()}
		// 				className="bg-white hover:bg-gray-500 text-gray-800 font-semibold py-2 px-4 border-2 border-black rounded shadow"
		// 			>
		// 				Click Here to Upload Image
		// 			</button>
		// 			<button
		// 				onClick={handleLogout}
		// 				className="bg-white hover:bg-gray-500 text-gray-800 font-semibold py-2 px-4 border-2 border-black rounded shadow"
		// 			>
		// 				Logout
		// 			</button>
		// 			<button
		// 				onClick={handleDelete}
		// 				className="bg-white hover:bg-gray-500 text-gray-800 font-semibold py-2 px-4 border-2 border-black rounded shadow"
		// 			>
		// 				Delete
		// 			</button>
		// 		</div>
		// 	</div>
			// <UpdateProfileModal
			// 	isOpen={isModalOpen}
			// 	onClose={closeModal}
			// 	userData1={userData1}
			// 	setNewUserData1={setNewUserData1}
			// />
		// </div>
	);
}
