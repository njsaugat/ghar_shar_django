import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
const Banner = () => {
  return (
    <Link to="/">
      <div className="logo w-3/5  flex items-center font-bold text-4xl my-5  leading-tight md:leading-snug md:w-1/2">
        <img
          // className="w-1/4 h-1/4 md:w-1/6 md:h-1/6"
          className="w-20 h-20"
          src={logo}
          alt=""
          srcSet=""
        />
        <span>Ghar</span>
        <span className="text-cyan-400">Shar</span>
      </div>
    </Link>
  );
};

export default Banner;
