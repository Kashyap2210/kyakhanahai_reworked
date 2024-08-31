import React from "react";
import { Outlet } from "react-router-dom";

// import Navbar from "./Navbar";
import Signup from "./Signup.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
// import Footer from "./Footer";
import UserProfileContextProvider from "../context/userContextProvider.jsx";

function App() {
  return (
    <UserProfileContextProvider>
      <Navbar />
      <Outlet />
      {/* Outlet allows us to change the maincontent of the page and populate different components. Outlet manages the nested routing in our code */}
      <Footer />
    </UserProfileContextProvider>
  );
}

export default App;
