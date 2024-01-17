import React, { useEffect, useState } from "react";
import Footer from "../LandingPage/Footer";
import Navbar from "../LandingPage/Navbar";
import Loads from "./Loads";

const Loading = () => {
  return (
    <>
      <Navbar />
      <Loads />
      <Footer />
    </>
  );
};

export default Loading;
