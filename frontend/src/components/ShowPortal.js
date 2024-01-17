import React from "react";
import { createPortal } from "react-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Navigate, useNavigate } from "react-router-dom";

const crossIcon = <FontAwesomeIcon icon={faXmark} />;

const ShowPortal = ({
  showOptions,
  setShowOptions,
  property,
  message,
  logOut,
}) => {
  const navigate = useNavigate();
  if (!showOptions) {
    return null;
  }
  return createPortal(
    <div
      onClick={(e) => {
        e.preventDefault();
        setShowOptions(false);
      }}
      className={`fixed font-poppins top-0 left-0 right-0 bottom-0 opacity-95 z-100 bg-gray-600 ${
        showOptions === true ? "active" : "inactive"
      }`}
    >
      <div className="fixed w-4/5 p-5 -translate-x-1/2 -translate-y-1/2 bg-white z-100 top-1/2 left-1/2 md:w-1/2 lg:w-1/4 rounded-xl ">
        <div className="relative flex items-center justify-between w-full">
          <h1 className="flex items-center justify-center">{message}</h1>
          <div
            onClick={(e) => {
              e.preventDefault();
              setShowOptions(false);
            }}
            className="text-3xl text-red-600 cursor-pointer "
          >
            {crossIcon}
          </div>
        </div>
        <div className="flex w-full mt-4 ">
          <div
            onClick={(e) => {
              e.preventDefault();
              setShowOptions(false);
            }}
            className="flex items-center justify-center w-1/2 p-2 border-r-2 cursor-pointer "
          >
            Cancel
          </div>
          <button
            onClick={(e) => {
              if (property) {
                fetch(`/property/${property.id}`, {
                  method: "DELETE",
                }).then((res) => {
                  res.json();
                  // @TODO: reload the page after removal or manage the state;
                });
                navigate("/loading");
                setTimeout(() => {
                  navigate("/");
                }, 2000);
              }
              if (logOut) {
                fetch("/logout", {
                  method: "POST",
                }).then((res) => {});
                navigate("/loading");
                setTimeout(() => {
                  navigate("/");
                  window.location.reload(false);
                }, 2000);
              }
            }}
            className="flex items-center justify-center w-1/2 p-2 tracking-widest cursor-pointer bg-gradient-to-t from-red-600 to-red-400"
          >
            {logOut ? "Yes" : "OK"}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal2")
  );
};
export default ShowPortal;
