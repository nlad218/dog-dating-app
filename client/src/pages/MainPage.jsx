import { useState } from "react";

export default function MainPage() {
  const profiles = [
    {
      dogName: "Duke",
      gender: "Male",
      image: "https://ebkc.org/wp-content/uploads/2019/07/americanbulldog4.jpg",
      breed: "Bulldog",
      age: 7,
      size: "Medium",
      about: "Drinks toilet water daily.",
      hobbies: "Dragging ass on the floor.",
    },
  ];

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="flex items-center my-10">
      <div className="card h-full w-full md:max-w-2xl shadow-xl bg-primary mx-10">
        <figure>
          <img
            src={profiles[0].image}
            alt="ProfilePic"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-white text-4xl">
            {profiles[0].dogName} - {profiles[0].age} yrs
          </h2>
          <h3 className="card-subtitle text-white">
            {profiles[0].gender} {profiles[0].breed}
          </h3>
          <div className="mt-3">
            <button
              onClick={toggleDetails}
              className="md:hidden text-white text-sm font-medium p-0 cursor-pointer"
            >
              More Details
            </button>
            <div className={`md:block ${showDetails ? "block" : "hidden"}`}>
              <h4 className="text-white mb-2">Size: {profiles[0].size}</h4>
              <h4 className="text-white mb-2">Bio: {profiles[0].about}</h4>
              <h4 className="text-white mb-2">Hobbies: {profiles[0].hobbies}</h4>
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
