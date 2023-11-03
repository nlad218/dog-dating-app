import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SELF_PROFILE } from "../utils/queries";
import Auth from "../utils/auth";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { UPDATE_USER } from "../utils/mutations";

export default function Profile() {
  const { error, loading, data } = useQuery(QUERY_SELF_PROFILE);
  const { update } = useMutation(UPDATE_USER);
  const userData = data?.me || {};
  const loggedIn = Auth.loggedIn();
  const [imageId, setImageId] = useState("eimq5aiwwim0kdjdztmg");

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
  myImage.resize(fill().width(500).height(250));

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
      <div className="card bg-primary">
        <div className="card-body text-white">
          <h2 className="text-center">Meet Pookie!{userData.dogName}</h2>
          <div className="container mx-auto p-4 flex flex-wrap">
            <div className="w-full md:w-1/2">
              <AdvancedImage cldImg={myImage} className="w-full" />
              <button
                onClick={() => widgetRef.current.open()}
                className="border-2 block my-3 p-1"
              >
                Click Here to Upload Image
              </button>
            </div>
            <div className="w-full md:w-1/2 md:pl-4">
              <div>
                <h3 className="mb-2">Owner name: {userData.ownerName}</h3>
                <h3 className="mb-2">Breed: {userData.breed}</h3>
                <h3 className="mb-2">Size: {userData.size}</h3>
                <h3 className="mb-2">Age: {userData.age}</h3>
                <h3 className="mb-2">Hobbies: </h3>
                <h3>About: {userData.about}</h3>
                {/* <textarea className = "w-full"></textarea> */}
              </div>
            </div>
            <div></div>
          </div>
          <button
            onClick={handleLogout}
            className="border-8 border-red-400 block"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
