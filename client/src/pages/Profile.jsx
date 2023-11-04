import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SELF_PROFILE } from "../utils/queries";
import Auth from "../utils/auth";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { UPDATE_USER } from "../utils/mutations";
import UpdateProfileModal from "../components/UpdateProfile";

export default function Profile() {
  const { error, loading, data } = useQuery(QUERY_SELF_PROFILE);
  const { update } = useMutation(UPDATE_USER);
  const userData = data?.me || {};
  const loggedIn = Auth.loggedIn();
  const [imageId, setImageId] = useState("eimq5aiwwim0kdjdztmg");
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
      function (error, result) {
        console.log(result.info.public_id);
        if (result.info.public_id) {
          setImageId(result.info.public_id);
        }
      }
    );
  });

  // Instantiate a CloudinaryImage object for the image with the public ID, 'docs/models'.
  const myImage = cld.image(imageId);
  console.log(userData);
  // Resize to 250 x 250 pixels using the 'fill' crop mode.
  myImage.resize(fill().width(700).height(400));

  const handleLogout = () => {
    Auth.logout();
    window.location.assign("/");
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      {!loggedIn && window.location.assign("/")}
      <div className="card bg-primary p-4 md:p-16 lg:p-16 xl:p-20 mt-3">
        {" "}
        {/* Responsive padding */}
        <div className="card-body text-black">
          <h2 className="text-center text-xl font-semibold">Meet {userData.dogName}!</h2>
          <div className="container mx-auto p-4 flex flex-wrap">
            <div className="w-full md:w-1/2  mb-3">
              {/* {" "} */}
              {/* Responsive width */}
              <div className="border-2 border-white">
                <AdvancedImage cldImg={myImage} className="w-full" />
              </div>
            </div>
            <div className="w-full md:w-1/2 md:pl-5">
              {/* {" "} */}
              {/* Responsive width */}
              <div>
                <h3 className="mb-2">Owner name: {userData.ownerName}</h3>
                <h3 className="mb-2">Breed: {userData.breed}</h3>
                <h3 className="mb-2">Size: {userData.size}</h3>
                <h3 className="mb-2">Age: {userData.age}</h3>
                <h3 className="mb-2">Hobbies: </h3>
                <h3>About: {userData.about}</h3>
                {/* <textarea className="w-full"></textarea> */}
              </div>
            </div>
            <div></div>
          </div>
          <button
            onClick={() => widgetRef.current.open()}
            className="btn border-8 block"
          >
            Click Here to Upload Image
          </button>
          <button className="btn" onClick={openModal}>
            Edit Profile
          </button>
          <button onClick={handleLogout} className="btn border-8 block">
            Logout
          </button>
        </div>
      </div>
      <UpdateProfileModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
