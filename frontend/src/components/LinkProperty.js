import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShowPortal from "./ShowPortal";
const DESCRIPTION_MAX_LENGTH = 100;
const buttonProperty = `py-2 px-5  rounded-lg bg-gradient-to-t from-sky-400 to-cyan-100  tracking-wide text-black shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300`;

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const LinkProperty = ({ property, smallDisplay, validUser, user }) => {
  const [showOptions, setShowOptions] = useState(false);
  const updateProperty = { ...property, update: true };
  const propertyApt = { ...property, owner: user || property.owner };
  return (
    <Link
      className="flex flex-col w-11/12 gap-4 p-8 m-5 transition-shadow duration-300 shadow-lg property bg-slate-50 md:w-4/5 lg:w-2/5 rounded-xl hover:shadow-xl hover:bg-white "
      key={property.id}
      to={`/explore/property/${property.id}`}
      state={propertyApt}
    >
      <div className="flex w-full h-full gap-x-2">
        <div className="w-1/3 image">
          <img
            className="object-cover w-full h-full transition-transform rounded-3xl hover:scale-105 "
            src={
              "http://127.0.0.1:5000/" +
              property?.imageUrl?.substring(
                property?.imageUrl?.indexOf("photo")
              )
            }
            alt=""
            srcSet=""
            loading="lazy"
          />
        </div>
        <div className="w-2/3 h-full">
          <h1 className="text-lg font-bold tracking-wide capitalize">
            {property.name}
          </h1>

          <p className="my-3 text-sm leading-4 text-slate-500">
            {property.description.substring(0, DESCRIPTION_MAX_LENGTH) + "..."}
          </p>

          <div className="flex items-center gap-5 attributes gap-x-20 ">
            <span className="text-lg font-bold price">
              रु {numberWithCommas(property.price)}
            </span>
            {!smallDisplay && (
              <span className="type">{property.propertyType}</span>
            )}
          </div>
          <hr className="my-3" />
          <div className="mt-2 owner">{property.location}</div>
        </div>
      </div>
      {validUser && (
        <div className="relative flex justify-around">
          <Link
            to={"/register-property"}
            state={updateProperty}
            className={buttonProperty}
          >
            Update
          </Link>
          <div
            onClick={(e) => {
              e.preventDefault();
              setShowOptions(true);
            }}
            className={`${buttonProperty} bg-gradient-to-t from-red-400 to-red-200 cursor-pointer`}
          >
            Delete
          </div>
          {showOptions && (
            <ShowPortal
              showOptions={showOptions}
              setShowOptions={setShowOptions}
              property={property}
              message={"Do you want to delete this property?"}
            />
          )}
        </div>
      )}
    </Link>
  );
};

export default LinkProperty;
