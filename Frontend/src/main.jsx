import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

console.log("App is running now");

// Importing components for rendering for specific paths
import Mainpage from "./components/Mainpage.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Adddish from "./components/Adddish.jsx";
import Showdish from "./components/Showdish.jsx";
import Getdish from "./components/Getdish.jsx";
import Profile from "./components/Profile.jsx";
import Bavarchi from "./components/Bavarchi.jsx";
import Checkplaces from "./components/Checkplaces.jsx";
import Contactus from "./components/Contactus.jsx";

const router = createBrowserRouter([
  // "createBrowserRouter" is used to create a router object with route definitions.

  {
    path: "/", //Defines the base path
    element: <App />, // App will contain the common layout
    children: [
      // Routes are defined & the components are assigned to that route so that when the request is sent on the route corresponding component will be rendered
      { path: "/", element: <Mainpage /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/adddish", element: <Adddish /> },
      { path: "/showdish", element: <Showdish /> },
      { path: "/getdish", element: <Getdish /> },
      { path: "/profile", element: <Profile /> },
      { path: "/bavarchi", element: <Bavarchi /> },
      { path: "/checkplaces", element: <Checkplaces /> },
      { path: "/contactUs", element: <Contactus /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
