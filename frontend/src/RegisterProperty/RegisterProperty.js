import React, { createContext, useContext, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Final from "./Final";
import Intro from "./Intro";
import Mid from "./Mid";
import Axios from "axios";
import { LoggedInContext } from "../App";
import Footer from "../LandingPage/Footer";
import Navbar from "../LandingPage/Navbar";
import { axios } from "../utils/apiclient";
import ProgressSteps from "./ProgressSteps";
export const FormContext = createContext();
const formItems = [<Intro />, <Mid />, <Final />];
const RegisterProperty = () => {
  document.title = "GharShar | Register Property";
  const { state } = useLocation();
  const property = state;
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const [rentClicked, setRent] = useState(
    property ? property.propertyType.toLowerCase() === "rent" && true : false
  );
  const [isFurnished, setIsFurnished] = useState(
    property ? property.furnished : false
  );
  const [showImage, setShowImage] = useState(
    property ? property.imageUrl && true : false
  );
  const previewImage = useRef(null);
  const inputImageFile = useRef(null);
  const [image, setImage] = useState({ preview: "", data: "" });

  const { loggedIn } = useContext(LoggedInContext);

  const [formState, setState] = useState({
    name: property ? property.name : "",
    imageUrl: property
      ? "http://127.0.0.1:5000/" +
        property.imageUrl.substring(property.imageUrl.indexOf("photo"))
      : "",
    bedrooms: property ? property.bedRoom : "",
    livingRooms: property ? property.livingRoom : "",
    bathrooms: property ? property.bathRoom : "",
    price: property ? property.price : "",
    address: property ? property.location : "",
    description: property ? property.description : "",
    image: "",
  });
  if (!loggedIn) {
    return navigate("/login");
  }

  function submit(e) {
    e.preventDefault();

    if (property != null && property.update != null) {
      //@TODO: check if image has been updated
      Axios.put("/formdata", {
        method: "PUT",
        headers: {
          "Content-Type": "mutlipart/form-data",
        },
        body: {
          ...formState,
          rent: rentClicked,
          furnished: isFurnished,
          propertyId: property.id ? property.id : "",
        },
      });
      navigate("/loading");
      return setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    const formData = new FormData();
    formData.append("image_url", image.data, image.data.name);
    formData.append("name", formState.name);
    formData.append("location", formState.address);
    formData.append("description", formState.description);
    formData.append("bath_room", formState.bathrooms);
    formData.append("living_room", formState.livingRooms);
    formData.append("price", formState.price);
    formData.append("bed_room", formState.bedrooms);
    formData.append("property_type", rentClicked ? "R" : "S");
    formData.append("is_furnished", !!isFurnished);

    axios.post("/property", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    navigate("/loading");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }
  return (
    <FormContext.Provider
      value={{
        step,
        setStep,
        formState,
        setState,
        rentClicked,
        setRent,
        isFurnished,
        setIsFurnished,
        previewImage,
        showImage,
        setShowImage,
        inputImageFile,
        image,
        setImage,
      }}
    >
      <Navbar />
      <div className="h-screen bg-gradient-to-r from-gray-200 to-gray-50">
        {/* //@TODO: add Navbar here  */}
        <h1 className="py-5 text-2xl font-bold tracking-wider text-center ">
          Register your property at GharShar
        </h1>
        <div className="py-10 left">
          <ProgressSteps step={step} setStep={setStep} />
        </div>
        <form
          className="flex justify-center "
          onSubmit={(e) => submit(e)}
          encType="multipart/form-data"
        >
          <>
            {formItems.map((FormItem, index) => {
              return (
                index === step && (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center w-11/12 transition-all bg-white border-2 shadow-lg right rounded-2xl border-slate-0 md:w-4/5 lg:w-1/2"
                  >
                    {FormItem}
                  </div>
                )
              );
            })}
          </>
        </form>
      </div>
      <Footer />
    </FormContext.Provider>
  );
};

export default RegisterProperty;
