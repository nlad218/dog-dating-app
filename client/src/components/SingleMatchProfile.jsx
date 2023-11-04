import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";
import { useState, useRef, useEffect } from "react";

export default function SingleMatchProfile(otherUser) {
    const [showDetails, setShowDetails] = useState(false);
    console.log(otherUser)


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
				console.log(result.info.public_id);
				if (result.info.public_id) {
					setImageId(result.info.public_id);
				}
			}
		);
	});
    const toggleDetails = () => {
		setShowDetails(!showDetails);
	};
    const myImage = cld.image(otherUser.otherUser.image);
    return (
        <div className="flex items-center my-10">
			<div className="card h-full w-full md:max-w-2xl shadow-xl bg-primary mx-10">
				<figure
					className="object-contain"
					style={{ maxWidth: 400, maxHeight: 350 }}
				>
					<AdvancedImage cldImg={myImage} />
				</figure>
				<div className="card-body">
					<h2 className="card-title text-white text-4xl">
						{otherUser.otherUser.dogName} - {otherUser.otherUser.age} yrs
					</h2>
					<h3 className="card-subtitle text-white">
						{otherUser.otherUser.breed}
					</h3>
					<div className="mt-3">
						<button
							onClick={toggleDetails}
							className="md:hidden text-white text-sm font-medium p-0 cursor-pointer"
						>
							More Details
						</button>
						<div className={`md:block ${showDetails ? "block" : "hidden"}`}>
							<h4 className="text-white mb-2">Size: {otherUser.otherUser.size}</h4>
							<h4 className="text-white mb-2">Bio: {otherUser.otherUser.about}</h4>
							<h4 className="text-white mb-2">
								Hobbies:
								<ul>
									{otherUser.otherUser.hobbies.map((hobby, index) => (
										<li key={index}>
											<h4>{hobby}</h4>
										</li>
									))}
								</ul>
							</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
    )
}