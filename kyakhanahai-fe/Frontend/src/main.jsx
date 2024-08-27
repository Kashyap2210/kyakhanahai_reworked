import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App.jsx";
import "./App.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

// Importing components for rendering for specific paths
import Mainpage from "./Components/Mainpage.jsx";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Adddish from "./Components/Adddish";
import Showdish from "./Components/Showdish";
import Getdish from "./Components/Getdish";
// import Checkplaces from "./Components/Checkplaces";
import Profile from "./Components/Profile";
import Bavarchi from "./Components/Bavarchi.jsx";
import Checkplaces from "./Components/Checkplaces.jsx";

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
      // { path: "/checkplaces", element: <Checkplaces /> },
      { path: "/profile", element: <Profile /> },
      { path: "/bavarchi", element: <Bavarchi /> },
      { path: "/checkplaces", element: <Checkplaces /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
