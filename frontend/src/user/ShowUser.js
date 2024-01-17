import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import LinkProperty from "../components/LinkProperty";
import Loading from "../components/Loading";
import Footer from "../LandingPage/Footer";
import Navbar from "../LandingPage/Navbar";
import { axios } from "../utils/apiclient";
const ShowUser = () => {
  document.title = "GharShar | User";

  const [user, setUser] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  useEffect(() => {
    async function getUser() {
      const data = await axios.get("/user/" + params.id);
      const userData = await data.json();
      setUser(userData);
      setLoading(false);
    }

    getUser();
  }, [params.id]);
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Navbar />
      <div className="flex flex-col w-screen bg-gradient-to-t from-slate-300 to-slate-50 md:flex-row">
        <div className="flex flex-col items-center w-full m-5 mb-10 left md:w-1/3 md:mb-1 ">
          <div className="flex items-center justify-center w-32 h-32 capitalize transition-all duration-300 rounded-full nameGenerator bg-gradient-to-t from-sky-400 to-cyan-100 hover:shadow-xl hover:scale-105">
            <span className="mt-2 text-white text-7xl">
              {user?.name?.charAt(0)}
            </span>
          </div>
          <h1 className="mx-5 my-10 text-2xl font-bold tracking-wide capitalize transition-all duration-300 md:text-3xl hover:scale-105">
            {user?.name}
          </h1>
          <span className="mx-5 mb-5 text-xl font-bold tracking-wide price">
            {user?.properties?.length} properties listed
          </span>
          <p className="mx-5 description">{user?.email}</p>
        </div>
        <div className="flex flex-col flex-wrap justify-center w-full mb-20 right md:w-2/3 lg:flex-row">
          {user?.properties.map((property) => {
            return (
              <LinkProperty
                property={property}
                smallDisplay={true}
                user={user}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShowUser;
