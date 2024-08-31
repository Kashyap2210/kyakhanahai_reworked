// This component renders the main page of our website

import React from "react";
import Firstintrocomp from "./Firstintrocomp.jsx";
import Secondintrocomp from "./Secondintrocomp.jsx";
import Thirdintrocomp from "./Thirdintrocomp.jsx";
import Footer from "./Footer.jsx";
import "../App.css";

export default function Mainpage() {
  return (
    <>
      <Firstintrocomp />
      <Secondintrocomp />
      <Thirdintrocomp />
    </>
  );
}
