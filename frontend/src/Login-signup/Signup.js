import React, { useRef } from "react";
import Banner from "../components/Banner";
import Tagline from "../components/Tagline";
import loginHouse from "../loginHouse.png";
import { Link, useNavigate } from "react-router-dom";
import validator, {
  checkConfPassword,
  checkEmail,
  checkPassword,
} from "./validator";
import { checkUsername } from "./validator";
import { axios } from "../utils/apiclient";
const Signup = () => {
  const navigate = useNavigate();
  document.title = "GharShar | Signup";

  const name = useRef(null);
  const username = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confPassword = useRef(null);
  const checkbox = useRef(null);
  const onSubmit = (e) => {
    e.preventDefault();
    axios.post("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "mutlipart/form-data",
      },
      body: {
        firstname: name.current.value,
        lastname: username.current.value,
        username: `${name.current.value}_${username.current.value}`,
        email: email.current.value,
        password: password.current.value,
      },
    });
    navigate("/loading");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };
  return (
    <div className="flex flex-col w-screen h-screen min-h-screen md:flex-row">
      <div className="flex-col items-center justify-center hidden w-auto md:flex bg-gradient-to-r from-sky-300 ">
        <Banner />
        <Tagline />
        <img src={loginHouse} alt="" srcSet="" />
      </div>
      <div className="flex flex-col items-center self-center justify-center w-full h-full md:w-1/2 md:pl-20">
        <div className="fixed flex -top-5 md:hidden">
          <Banner />
        </div>
        <h1 className="mt-20 text-2xl font-bold ">Sign Up to GharShar</h1>
        <form
          className="flex flex-col items-center justify-center w-10/12 m-2 p-7 md:p-10 md:w-full"
          encType="multipart/form-data"
          onSubmit={(e) => onSubmit(e)}
        >
          <div className="flex justify-between w-full gap-x-5 lg:w-10/12">
            <div className="flex flex-col self-center w-1/2 my-5 option ">
              <label className="mb-1 font-bold tracking-wider" htmlFor="name">
                First Name
              </label>
              <input
                className="w-full px-3 py-2 bg-gray-100 border-0 border-gray-300 rounded-lg shadow-md outline-0 "
                type="text"
                name="name"
                ref={name}
              />
            </div>
            <div className="flex flex-col self-center w-1/2 my-5 option">
              <label
                className="mb-1 font-bold tracking-wider"
                htmlFor="username"
              >
                Last name
              </label>
              <input
                className="w-full px-3 py-2 bg-gray-100 border-0 border-gray-300 rounded-lg shadow-md outline-0 "
                type="text"
                name="username"
                ref={username}
                onChange={(e) => {
                  checkUsername(username);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col self-center w-full my-5 option lg:w-10/12">
            <label className="mb-1 font-bold tracking-wider" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 bg-gray-100 border-0 border-gray-300 rounded-lg shadow-md outline-0 "
              type="email"
              name="email"
              ref={email}
              onChange={(e) => {
                checkEmail(email);
              }}
            />
          </div>
          <div className="flex flex-col self-center w-full my-5 option lg:w-10/12">
            <label className="mb-1 font-bold tracking-wider" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 bg-gray-100 border-0 border-gray-300 rounded-lg shadow-md outline-0 "
              type="password"
              name="password"
              ref={password}
              onChange={(e) => {
                checkPassword(password);
              }}
            />
          </div>
          <div className="flex flex-col self-center w-full my-5 option lg:w-10/12">
            <label
              className="mb-1 font-bold tracking-wider"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="w-full px-3 py-2 bg-gray-100 border-0 border-gray-300 rounded-lg shadow-md outline-0 "
              type="password"
              name="confirmPassword"
              ref={confPassword}
              onChange={(e) => {
                checkConfPassword(confPassword);
              }}
            />
          </div>
          <div className="flex w-full my-3 align-items self outline-0-center lg:w-10/12">
            <label htmlFor="tac">
              <input
                id="tac"
                type="checkbox"
                name="terms-and-conditions"
                className="w-4 h-4"
                ref={checkbox}
              />
              I agree to the Terms and Conditions.
            </label>
          </div>
          <button
            className="w-full px-5 py-3 text-black rounded-lg outline-0 lg:w-10/12 bg-gradient-to-t from-cyan-500 to-cyan-100"
            type="submit"
            onClick={(e) => {
              validator(
                e,
                username.current,
                email.current,
                password.current,
                confPassword.current,
                checkbox.current
              );
            }}
          >
            Sign Up
          </button>
          <p className="mt-4">
            Already a member?
            <Link to={"/login"} className="font-bold ">
              {" "}
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
