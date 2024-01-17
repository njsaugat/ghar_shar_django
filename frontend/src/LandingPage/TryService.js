import { Link } from 'react-router-dom';
import housings from '../housings.png';

const TryService = () => {
  return (
    <div className="flex relative p-10 md:p-20 justify-between items-center my-10  bg-gradient-to-b from-gray-400 to-black-50 ">
      <div className="left w-3/5">
        <h1 className="font-bold text-5xl my-5  leading-tight md:leading-snug">
          Let’s start your dream house journey now!
        </h1>
        <span className="text-gray-400 w-11/12">
          Find the right house over the wide rande of houses.
        </span>
        <br />
        <Link to="/signup">
          <button className="py-3 px-5 my-10 rounded-xl bg-gradient-to-t from-cyan-500 to-cyan-100   text-black">
            Sign Up
          </button>
        </Link>
      </div>
      <div className="right absolute right-0 -bottom-10 w-1/2  ">
        <img
          className=" object-cover  opacity-95  w-full h-full  "
          src={housings}
          alt=""
          srcSet=""
        />
      </div>
    </div>
  );
};

export default TryService;
