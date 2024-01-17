import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import PrevNext from "./PrevNext";
import { FormContext } from "./RegisterProperty";
const buttonProperty = "px-3 py-1  w-1/2 transition-all ease-out ";
const selectedProperty = `${buttonProperty} bg-gradient-to-t from-sky-400 to-cyan-100 font-bold tracking-wider hover:shadow-xl hover:scale-105 transition-all duration-300`;

const plusIcon = <FontAwesomeIcon icon={faPlus} />;

const Intro = () => {
  const { step, setStep } = useContext(FormContext);
  const { formState, setState } = useContext(FormContext);
  const { rentClicked, setRent } = useContext(FormContext);
  const { showImage, setShowImage } = useContext(FormContext);
  const { previewImage } = useContext(FormContext);
  const { inputImageFile } = useContext(FormContext);

  const { setImage } = useContext(FormContext);
  return (
    <>
      <div className="flex flex-col self-center w-1/2 my-5 option " key={1}>
        <label className="mb-1 font-bold tracking-wider" htmlFor="name">
          Name
        </label>
        <input
          className="w-full px-3 py-2 bg-gray-100 border-0 border-gray-300 rounded-lg shadow-md outline-0 "
          type="text"
          id="name"
          name="name"
          required
          placeholder="Enter the property's name"
          value={formState.name}
          onChange={(e) => {
            setState((prevState) => {
              return { ...prevState, name: e.target.value };
            });
          }}
        />
      </div>
      <div className="flex flex-col self-center w-1/2 my-5 ">
        <p className="self-start mb-1 font-bold tracking-wider " htmlFor="name">
          Select property type
        </p>
        <div className="flex self-center w-full p-1 my-5 lg:w-10/12 bg-cyan-100 rounded-3xl">
          <button
            className={
              rentClicked
                ? selectedProperty + " rounded-tl-2xl rounded-bl-2xl"
                : buttonProperty
            }
            onClick={(e) => {
              e.preventDefault();

              setRent(true);
            }}
          >
            Rent
          </button>
          <button
            className={
              rentClicked
                ? buttonProperty
                : selectedProperty + " rounded-tr-2xl rounded-br-2xl"
            }
            onClick={(e) => {
              e.preventDefault();
              setRent(false);
            }}
          >
            Sale
          </button>
        </div>
      </div>
      <span className="w-1/2 mb-1 font-bold tracking-wider ">
        Choose Image:
      </span>
      <div className="flex items-center self-center w-1/2 my-5 justify-evenly">
        <img
          id="viewProperty"
          src={formState.imageUrl}
          ref={previewImage}
          className={showImage ? "h-36 w-48" : "hidden"}
          loading="lazy"
          alt=""
        ></img>
        <label
          htmlFor="myfile"
          className="flex flex-col items-center self-center justify-center w-32 h-32 my-5 font-bold tracking-wide bg-gray-100 border-2 border-dashed rounded-md cursor-pointer"
        >
          <span className="text-4xl">{plusIcon}</span>
          <small className="text-gray-400">Choose a photo*</small>
        </label>

        <input
          type="file"
          id="myfile"
          name="uploadedImage"
          className="hidden"
          accept="image/*"
          required
          ref={inputImageFile}
          onChange={(e) => {
            const [file] = e.target.files;
            if (file) {
              previewImage.current.src = URL.createObjectURL(file);
              setShowImage(true);
              setState((prevState) => {
                return {
                  ...prevState,
                  imageUrl: URL.createObjectURL(file),
                  image: file,
                };
              });

              const img = {
                preview: URL.createObjectURL(e.target.files[0]),
                data: e.target.files[0],
              };
              setImage(img);
            }
          }}
        ></input>
      </div>

      <PrevNext step={step} setStep={setStep} />
    </>
  );
};

export default Intro;
