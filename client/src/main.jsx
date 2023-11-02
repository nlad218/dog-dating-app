import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import LandingPage from "./pages/Home";
import Main from "./pages/Main";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import ExImgUpload from "./pages/ExImgUpload.jsx"

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				// ALL non-users should be redirected to this page, no matter what
				index: true,
				element: <LandingPage />,
			},
			{
				path: "/main",
				element: <Main />,
			},
			{
				path: "/chat",
				element: <Chat />,
			},
			{
				path: "/profile",
				element: <Profile />,
			},
			{
				path: '/imgupload',
				element: <ExImgUpload />
			}
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
