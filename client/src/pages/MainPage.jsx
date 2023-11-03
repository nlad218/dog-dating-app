import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_DISPLAYABLE_USERS } from "../utils/queries";
import { ADD_TO_LIKES, CREATE_MATCH } from "../utils/mutations";
import Auth from "../utils/auth";

export default function MainPage() {
	const [index, setIndex] = useState(0);
	const [showDetails, setShowDetails] = useState(false);

	const [addToLikes] = useMutation(ADD_TO_LIKES);
	const [createMatch] = useMutation(CREATE_MATCH);

	const { loading, data, error } = useQuery(QUERY_DISPLAYABLE_USERS);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		console.error("Error fetching data:", error);
		return <p>Error fetching data</p>;
	}

	const profiles = data.getRandomUsers;

	const leftSwipe = () => {
		setIndex(
			(prevIndex) => (prevIndex + 1 + profiles.length) % profiles.length
		);
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
			}
		}

		setIndex((prevIndex) => (prevIndex + 1) % profiles.length);
	};

	const toggleDetails = () => {
		setShowDetails(!showDetails);
	};

	return (
		<div className="flex items-center my-10">
			<div className="card h-full w-full md:max-w-2xl shadow-xl bg-primary mx-10">
				<figure>
					<img
						src={profiles[index].image}
						alt="ProfilePic"
						style={{ width: "100%", height: "100%", objectFit: "cover" }}
					/>
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
		</div>
	);
}
