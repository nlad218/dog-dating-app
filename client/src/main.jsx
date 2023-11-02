import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import LandingPage from "./pages/Home";
import MainPage from "./pages/MainPage.jsx";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import ExImgUpload from "./pages/ExImgUpload.jsx";

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
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/imgupload",
        element: <ExImgUpload />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
