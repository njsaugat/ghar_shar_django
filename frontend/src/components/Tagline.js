import React from 'react';

const Tagline = ({ textSize }) => {
  return (
    <section
      className={`text-5xl leading-normal md:text-${textSize} ${
        textSize && 'md:text-7xl'
      } md:leading-normal my-10 font-bold `}
    >
      Your Dream
      <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-cyan-300">
        House is Waiting
      </span>
      <br />
      For You. <br />
    </section>
  );
};

export default Tagline;
