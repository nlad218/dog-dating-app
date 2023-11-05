import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_DISPLAYABLE_USERS } from "../utils/queries";
import { ADD_TO_LIKES, CREATE_MATCH } from "../utils/mutations";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import Auth from "../utils/auth";

export default function MainPage() {
	const [index, setIndex] = useState(0);
	const [showDetails, setShowDetails] = useState(false);
	const [imageId, setImageId] = useState("");
	const [isMatched, setIsMatched] = useState(false);

	const [addToLikes] = useMutation(ADD_TO_LIKES);
	const [createMatch] = useMutation(CREATE_MATCH);

	const cld = new Cloudinary({
		cloud: {
			cloudName: "dkxtk2v4z",
		},
	});

	const cloudinaryRef = useRef();
	const widgetRef = useRef();
	useEffect(() => {
		cloudinaryRef.current = window.cloudinary;
		widgetRef.current = cloudinaryRef.current.createUploadWidget(
			{
				cloudName: "dkxtk2v4z",
				uploadPreset: "dogprofile_test",
			},
			function (error, result) {
				if (result.info.public_id) {
					setImageId(result.info.public_id);
				}
			}
		);
	});

	const { loading, data, error, refetch } = useQuery(QUERY_DISPLAYABLE_USERS);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		console.error("Error fetching data:", error);
		return <p>Error fetching data</p>;
	}

	const profiles = data.getRandomUsers;

	const leftSwipe = () => {
		const newIndex = (index + 1) % profiles.length;
		setIndex(newIndex);
		if (newIndex === 0) {
			refetch();
		}
	};

	const rightSwipe = () => {
		addToLikes({
			variables: { otherId: profiles[index]._id },
		});

		for (let i = 0; i < profiles[index].likes.length; i++) {
			if (profiles[index].likes[i]._id == Auth.getProfile().data._id) {
				console.log("match");
				createMatch({
					variables: { otherId: profiles[index]._id },
				});
				setIsMatched(true);

				setTimeout(() => {
					setIsMatched(false);
				}, 2000);
			}
		}

		const newIndex = (index + 1) % profiles.length;
		setIndex(newIndex);

		if (newIndex === 0) {
			refetch();
		}
	};

	const toggleDetails = () => {
		setShowDetails(!showDetails);
	};

	const myImage = cld.image(profiles[index].image);

	return (
		<div className="flex items-center mb-10 mt-5">
			<div
				className="card h-full w-full md:max-w-2xl shadow-xl bg-primary mx-10 border-2 border-black"
				style={{ maxWidth: 450, maxHeight: 525 }}
			>
				<figure>
					<AdvancedImage cldImg={myImage} />
				</figure>
				<div className="card-body">
					<h2 className="card-title text-white text-4xl">
						{profiles[index].dogName} - {profiles[index].age} yrs
					</h2>
					<h3 className="card-subtitle text-white">
						{profiles[index].gender} {profiles[index].breed}
					</h3>
					<div className="mt-3">
						<button
							onClick={toggleDetails}
							className="md:hidden text-white text-sm font-medium p-0 cursor-pointer"
						>
							More Details
						</button>
						<div className={`md:block ${showDetails ? "block" : "hidden"}`}>
							<h4 className="text-white mb-2">Size: {profiles[index].size}</h4>
							<h4 className="text-white mb-2">Bio: {profiles[index].about}</h4>
							<h4 className="text-white mb-2">
								Hobbies:
								<ul>
									{profiles[index].hobbies.map((hobby, index) => (
										<li key={index}>
											<h4>{hobby}</h4>
										</li>
									))}
								</ul>
							</h4>
						</div>
					</div>
					<div className=" mt-3 card-actions justify-between">
						<button id="left" className="btn btn-circle">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="red"
								onClick={leftSwipe}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
						<button id="right" className="btn btn-circle">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="green"
								className="w-6 h-6"
								onClick={rightSwipe}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M4.5 12.75l6 6 9-13.5"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
			{isMatched && (
				<div className="toast toast-center toast-middle">
					<div className="alert alert-success">
						<span>New Match!</span>
					</div>
				</div>
			)}
		</div>
	);
}
