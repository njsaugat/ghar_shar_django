import React from "react";
import Business from "./Business";
import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "./Navbar";
import TryService from "./TryService";

const LandingPage = () => {
  return (
    <div className="w-screen ">
      <Navbar />
      <Hero />
      <Business />
      <TryService />
      <Footer />
    </div>
  );
};

export default LandingPage;
