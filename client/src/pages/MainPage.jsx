import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { QUERY_DISPLAYABLE_USERS } from "../utils/queries";

export default function MainPage() {
	const [index, setIndex] = useState(0);

	const { loading, data, error } = useQuery(QUERY_DISPLAYABLE_USERS);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		console.error("Error fetching data:", error);
		return <p>Error fetching data</p>;
	}

	const profiles = data.getRandomUsers;

	return (
		<div className="flex m-2">
			<div className="card w-96 shadow-xl bg-primary">
				<figure>
					<img
						src={profiles[index].image}
						alt="ProfilePic"
						style={{ width: "100%", height: "100%", objectFit: "cover" }}
					/>
				</figure>
				<div className="card-body">
					<h2 className="card-title text-white text-4xl">
						{profiles[index].dogName} - {profiles[index].age}
					</h2>
					<h3 className="card-subtitle text-white">
						{profiles[index].gender} {profiles[index].breed}
					</h3>
					<div className="collapse bg-primary mt-3" style={{ width: "50%" }}>
						<input type="checkbox" />
						<div className="collapse-title text-white text-sm font-medium p-0">
							More Details
						</div>
						<div className="collapse-content p-0">
							<h4 className="text-white mb-2">Size: {profiles[index].size}</h4>
							<h4 className="text-white mb-2">Bio: {profiles[index].about}</h4>
							<h4 className="text-white">
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
						<button className="btn btn-circle">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="red"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
						<button className="btn btn-circle">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="green"
								className="w-6 h-6"
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
