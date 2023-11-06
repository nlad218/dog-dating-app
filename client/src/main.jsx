import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import LandingPage from "./pages/Home";
import MainPage from "./pages/MainPage.jsx";
import Matches from "./pages/Matches";
import Profile from "./pages/Profile.jsx";
import ErrorPage from "./pages/ErrorPage.jsx"
import Auth from "./utils/auth.js";
const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: Auth.loggedIn() ? <MainPage /> : <LandingPage />,
			},
			{
				path: "/matches",
				element: <Matches />,
			},
			{
				path: "/profile",
				element: <Profile />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
