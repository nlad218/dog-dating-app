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
        <div className="flex justify-center items-center my-10 px-5 heightSet">
			<div className="card lg:card-side bg-primary h-full m-1 mainDivSingleP">
				<figure
					className="imageDiv"
					
				>
					<AdvancedImage cldImg={myImage} className = "imageStyle" />
				</figure>
				<div className="card-body overflow-auto infoDiv">
					<h2 className="cardTitle">
						{otherUser.otherUser.dogName} - {otherUser.otherUser.age} yrs
					</h2>
					<h3 className="card-subtitle text-white breed">
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
							<h4 className="text-white mb-2 details">Size: {otherUser.otherUser.size}</h4>
							<h4 className="text-white mb-2 details">Bio: {otherUser.otherUser.about}</h4>
							<h4 className="text-white mb-2 details">
								Hobbies:
								<ul>
									{otherUser.otherUser.hobbies.map((hobby, index) => (
										<li key={index} className = "cardLi">
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