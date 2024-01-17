import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Navbar from "../LandingPage/Navbar";
import ShowPage from "./ShowPage";
import { Link } from "react-router-dom";
import LinkProperty from "../components/LinkProperty";
import Footer from "../LandingPage/Footer";
import { axios } from "../utils/apiclient";

const LETTERS_MAX_LENGTH = 100;
const buttonProperty = `py-2 px-5 my-10 rounded-lg bg-gradient-to-t from-sky-400 to-cyan-100  tracking-wide text-black shadow-lg cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300`;

const PROPERTIES_PER_PAGE = 1;

const getPropertiesPerPage = (totalProperties) =>
  totalProperties / PROPERTIES_PER_PAGE;

const getArrayofPages = (totalPages) => {
  return Array.from(Array(totalPages).keys());
};

const Explore = () => {
  document.title = "GharShar | Explore";

  const [properties, setProperties] = useState([{}]);
  const [isLoading, setLoading] = useState(true);

  const [pagingationArr, setPaginationArr] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);

  function returnIndexRange(index) {
    return (
      index < selectedPage * PROPERTIES_PER_PAGE &&
      index >= (selectedPage - 1) * PROPERTIES_PER_PAGE
    );
  }
  useEffect(() => {
    async function getProperties() {
      const data = await axios.get("/property");
      const propertiesData = data.data;
      setProperties(propertiesData);
      setLoading(false);

      const totalPages = getPropertiesPerPage(propertiesData.length);
      setPaginationArr(getArrayofPages(totalPages));
    }
    getProperties();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center w-screen h-screen transition-all properties bg-slate-100 ">
        {properties.map((property, index) => {
          return (
            returnIndexRange(index) && <LinkProperty property={property} />
          );
        })}
        <div className="flex items-center gap-6 pagination bg-slate-100">
          <span
            className={`prev  ${buttonProperty}`}
            onClick={() => {
              if (selectedPage === 1) {
                return setSelectedPage(pagingationArr.length);
              }
              setSelectedPage((prevPage) => prevPage - 1);
            }}
          >
            Prev
          </span>
          {pagingationArr.map((page, index) => {
            return (
              <ShowPage
                page={page}
                index={index}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            );
          })}
          <span
            className={`next  ${buttonProperty}`}
            onClick={() => {
              if (selectedPage === pagingationArr.length) {
                return setSelectedPage(1);
              }
              setSelectedPage((prevPage) => prevPage + 1);
            }}
          >
            Next
          </span>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Explore;
