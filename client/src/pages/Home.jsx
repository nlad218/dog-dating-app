import React, { useState } from "react";

import LoginModal from "../components/Login";

export default function LandingPage() {
	const [isModalOpen, setModalOpen] = useState(false);

	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	const reviews = [
		{
			name: "Josh K.",
			review:
				"This app is an absolute gem for dog owners. It has completely transformed our dog's social life. We've connected with other local dog parents and organized playdates that our fur baby adores.",
		},
		{
			name: "Nick F.",
			review:
				"I can't speak highly enough about this app. It's a dream come true for anyone who loves dogs. The way it connects local dog owners and their four-legged companions is remarkable.",
		},
		{
			name: "Maya N.",
			review:
				"Our dog's social circle has expanded, and the improvement in his happiness and energy levels is astounding. We've met incredible people through the app, all united by their love for dogs. ",
		},
	];

	function ReviewCards({ name, review }) {
		return (
			<div className="p-4 w-full md:w-4/12">
				<div className="rounded-lg shadow-lg bg-neutral">
					<div className="p-4">
						<div className="flex justify-between items-center">
							<h3 className="text-xl font-semibold">{name}</h3>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
								/>
							</svg>
						</div>
						<p className="mt-2">{review}</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div>
			<div
				className="hero min-h-screen"
				style={{
					backgroundImage:
						"url(https://img.freepik.com/premium-photo/group-dogs-are-sitting-together-park_902338-22817.jpg)",
				}}
			>
				<div className="hero-overlay bg-opacity-60"></div>
				<div className="hero-content text-center text-neutral-content">
					<div className="max-w-md">
						<h1 className="mb-5 text-5xl font-bold">Go for a walk?</h1>
						<p className="mb-5">Find a best freind for man's best freind!</p>
						<button className="btn btn-primary" onClick={openModal}>
							Login / Sign up
						</button>
					</div>
				</div>
			</div>
			<div className="grid md:flex">
				{reviews.map((review, index) => (
					<ReviewCards key={index} name={review.name} review={review.review} />
				))}
			</div>
			<LoginModal isOpen={isModalOpen} onClose={closeModal} />
		</div>
	);
}
