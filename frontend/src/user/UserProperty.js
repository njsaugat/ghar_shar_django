import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();
  useEffect(() => {
    async function getUser() {
      try {
        const data = await axios.get("/user/properties");
        const userData = await data.data;
        setUser(userData);
        setLoading(false);
      } catch {
        navigate("/login");
      }
    }

    getUser();
  }, [navigate]);
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Navbar />
      <div className="flex flex-col w-screen bg-gradient-to-t from-slate-300 to-slate-50 md:flex-row">
        <div className="flex flex-col items-center w-full m-5 mb-10 left md:w-1/3 md:mb-1 ">
          <div className="flex items-center justify-center w-32 h-32 capitalize rounded-full nameGenerator bg-gradient-to-t from-sky-400 to-cyan-100">
            <span className="text-white text-7xl">
              {user?.first_name?.charAt(0)}
            </span>
          </div>
          <h1 className="mx-5 my-10 text-2xl font-bold tracking-wide capitalize md:text-3xl">
            {user?.first_name} {user?.last_name}
          </h1>
          <span className="mx-5 mb-5 text-xl font-bold tracking-wide price">
            {user?.properties?.length ? user?.properties?.length : 0} properties
            listed
          </span>
          <p className="mx-5 description">{user?.email}</p>
        </div>
        <div className="flex flex-col flex-wrap justify-center w-full mb-20 right md:w-2/3 lg:flex-row">
          {user?.properties?.map((property) => {
            return (
              <LinkProperty
                property={property}
                smallDisplay={true}
                validUser={true}
                user={user}
              />
            );
          })}
          {user?.properties?.length === 0 ? <span className="text-4xl">No property listed.😔</span> : null}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShowUser;
