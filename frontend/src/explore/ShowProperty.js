import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Footer from "../LandingPage/Footer";
import Navbar from "../LandingPage/Navbar";
import Loading from "../components/Loading";
import { axios } from "../utils/apiclient";
const viewsIcon = <FontAwesomeIcon icon={faEye} />;

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function getRandomNumber() {
  return Math.floor(Math.random() * 100);
}

function getPropertyAttributes(property) {
  document.title =
    property?.name.charAt(0).toUpperCase() + property?.name.slice(1);
  const { location, furnished, bed_room, living_room, bath_room, email } =
    property;
  // const email = property?.owner?.email;
  let propertyAttributes = {
    location,
    furnished: furnished === true ? "Yes" : "No",
    bed_room,
    living_room,
    bath_room,
    email,
  };
  return propertyAttributes;
}
const ShowProperty = () => {
  const { state } = useLocation();
  const params = useParams();
  const [property, setProperty] = useState(() => (state ? state : {}));

  const [propertyAttributes, setPropertyAttributes] = useState(() =>
    state ? getPropertyAttributes(state) : {}
  );
  const [isLoading, setLoading] = useState(() => (state ? false : true));
  useEffect(() => {
    async function getProperties() {
      const data = await axios.get("/property?/" + params.id);
      const propertiesData = await data.json();
      setProperty(propertiesData);
      setLoading(false);
      setPropertyAttributes(getPropertyAttributes(propertiesData));
    }

    if (!state) {
      getProperties();
    }
  }, [state, params.id]);
  const RenderPropertyAttributes = () => {
    console.log(propertyAttributes);
    return (
      <div className="self-center w-10/12 p-5 mx-5 mt-5 leading-8 rounded-lg attributes md:leading-10 bg-gradient-to-r from-sky-200 to-cyan-50 md:w-11/12 lg:w-3/5 md:self-start ">
        {Object.entries(propertyAttributes).map(([key, value]) => {
          return (
            <div key={key} className="flex gap-x-20 md:gap-x-28 lg:gap-x-48 ">
              <span className="w-20 capitalize">{key.split("_").join("")}</span>
              <span>{propertyAttributes[key]}</span>
            </div>
          );
        })}
      </div>
    );
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Navbar />
      <div className="flex flex-col w-screen bg-gradient-to-t from-slate-50 to-cyan-50 md:flex-row md:h-screen bg-slate-50">
        <div className="flex flex-col w-full m-5 mb-10 left md:w-1/3 md:mb-1 ">
          <img
            className="w-11/12 transition-transform md:w-full hover:scale-105 rounded-xl"
            src={"http://127.0.0.1:8000" + property?.image_url}
            alt="property"
            loading="lazy"
          />
          <div className="flex flex-col items-center justify-between text-l gap-y-5">
            <Link to={`/user/${property?.owner?.id}`} state={property?.owner}>
              <div className="flex items-center justify-center w-16 h-16 capitalize transition-all duration-300 rounded-full nameGenerator bg-gradient-to-t from-sky-400 to-cyan-100 hover:shadow-xl hover:scale-105">
                <span className="mt-2 text-5xl text-white">
                  {property?.owner?.name.charAt(0)}
                </span>
              </div>
            </Link>
            <Link to={`/user/${property?.owner?.id}`} state={property?.owner}>
              <span className="text-xl font-bold transition-all duration-300 hover:scale-105">
                {property?.owner?.name}
              </span>
            </Link>
            <span className="tracking-wide">
              {viewsIcon} {getRandomNumber()} views
            </span>
          </div>
        </div>

        <div className="flex flex-col w-full mb-20 right md:w-2/3 md:mb-0">
          <h1 className="mx-5 my-10 text-2xl font-bold tracking-wide capitalize md:text-3xl">
            {property?.name}
          </h1>
          <span className="mx-5 mb-5 text-xl font-bold tracking-wide price">
            रु {numberWithCommas(property?.price)}
          </span>
          <p className="mx-5 description">{property?.description}</p>

          <RenderPropertyAttributes />
          <div className="flex flex-col items-center justify-center mx-5 mb-10 md:w-1/2 md:mt-5 md:mb-16">
            <div className="flex items-center justify-center px-5 py-2 mx-5 mt-10 text-2xl tracking-wide text-black rounded-lg shadow-lg w-36 bg-gradient-to-t from-slate-200 to-cyan-100 ">
              For{" "}
              {property?.property_type?.toLowerCase() === "r" ? "Rent" : "Sale"}
            </div>
            <div className="w-3 h-16 shadow-lg bg-gradient-to-b from-slate-200 to-cyan-100"></div>
            <div className="w-1/2 h-1 bg-slate-400"></div>
          </div>
          <div className="mx-5">
            <span className="">Find other properties posted by </span>
            <Link
              className="font-bold hover:tracking-wide "
              to={`/user/${property?.owner?.id}`}
            >
              {property?.owner?.name}
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShowProperty;
