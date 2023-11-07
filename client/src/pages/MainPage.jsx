import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { QUERY_DISPLAYABLE_USERS, QUERY_USER_LIKES } from "../utils/queries";
import { ADD_TO_LIKES, CREATE_MATCH } from "../utils/mutations";
import { Cloudinary } from "@cloudinary/url-gen";

import { AdvancedImage } from "@cloudinary/react";
import Auth from "../utils/auth";
import "../styles/MainPage.css";

export default function MainPage() {
  const [index, setIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [imageId, setImageId] = useState("");
  const [isMatched, setIsMatched] = useState(false);

  const [addToLikes] = useMutation(ADD_TO_LIKES);
  const [createMatch] = useMutation(CREATE_MATCH);

  const [getUserLikes] = useLazyQuery(QUERY_USER_LIKES);

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
    return <span className="loading loading-ball loading-lg"></span>;
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <p>You are out of users to like!</p>;
  }

  const profiles = data.getRandomUsers;

  const leftSwipe = () => {
    const newIndex = (index + 1) % profiles.length;
    setIndex(newIndex);
    if (newIndex === 0) {
      refetch();
    }
  };

  const rightSwipe = async () => {
    await addToLikes({
      variables: { otherId: profiles[index]._id },
    });

    await getUserLikes({
      variables: { userId: profiles[index]._id },
      onCompleted: function (data) {
        // console.log(data.user.likes);
        data.user.likes.forEach(async (like) => {
          if (like._id === Auth.getProfile().data._id) {
            console.info("match!");
            await createMatch({
              variables: { otherId: profiles[index]._id },
            });
            setIsMatched(true);

            setTimeout(() => {
              setIsMatched(false);
            }, 2000);
            return;
          }
        });
      },
    });
    // console.info(data);

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
    <>
      <div className="card lg:card-side bg-base-100 shadow-xl mainDiv">
        <figure className="imageDiv">
          <AdvancedImage
            cldImg={myImage}
            className="border border-white h-full imageStyle"
          />
        </figure>
        <div className="card-body bg-primary overflow-auto infoDiv">
          <h2 className="cardTitle">
            {profiles[index].dogName} - {profiles[index].age} yrs
          </h2>
          <h3 className="card-subtitle text-white breed">
            {profiles[index].gender} {profiles[index].breed}
          </h3>
          <div>
            <button
              onClick={toggleDetails}
              className="md:hidden text-white cursor-pointer"
            >
              More Details ⇩
            </button>
            <div className={`md:block ${showDetails ? "block" : "hidden"}`}>
              <h4 className="text-white mb-2 details">
                <u>Size</u>: {profiles[index].size}
              </h4>
              <h4 className="text-white mb-2 details">
                <u>Bio</u>: {profiles[index].about}
              </h4>
              <h4 className="text-white mb-2 details">
                <u>Hobbies</u>:
                <ul>
                  {profiles[index].hobbies.map((hobby, index) => (
                    <li key={index} className="cardLi">
                      <h4>{hobby}</h4>
                    </li>
                  ))}
                </ul>
              </h4>
            </div>
          </div>
          <div className="card-actions w-full justify-end buttonDiv">
            <button id="left" className="btn btn-circle buttonStyle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="buttonSvg"
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
            <button id="right" className="btn btn-circle buttonStyle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="green"
                className="buttonSvg"
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
        {isMatched && (
          <div className="toast toast-center toast-middle">
            <div className="alert alert-success">
              <span>New Match!</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
