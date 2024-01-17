import React, { useContext, useState } from 'react';
import PrevNext from './PrevNext';
import { FormContext } from './RegisterProperty';

const buttonProperty =
  'px-3 py-1  w-1/2 transition-all ease-out hover:shadow-xl hover:scale-105 transition-all duration-300';
const selectedProperty = `${buttonProperty} bg-gradient-to-t from-sky-400 to-cyan-100 font-bold tracking-wider `;

const Mid = () => {
  const { step, setStep } = useContext(FormContext);

  const { formState, setState } = useContext(FormContext);
  const { isFurnished, setIsFurnished } = useContext(FormContext);
  return (
    <>
      <div className="option option2  flex items-center  my-5   w-3/5 " key={2}>
        <label className="font-bold tracking-wider w-56 " htmlFor="bedrooms">
          Bedrooms
        </label>
        <input
          className=" border-gray-300 border-0 shadow-md ml-2 bg-gray-100 w-full lg:w-2/5 rounded-lg  px-3  outline-0 "
          type="number"
          name="name"
          id="bedrooms"
          min={0}
          value={formState.bedrooms}
          onChange={(e) => {
            setState((prevState) => {
              return { ...prevState, bedrooms: e.target.value };
            });
          }}
        />
      </div>
      <div className="option option2  flex items-center   my-5   w-3/5 ">
        <label className="font-bold tracking-wider  w-56" htmlFor="living">
          Living Room
        </label>
        <input
          className=" border-gray-300 border-0 shadow-md ml-2 bg-gray-100 w-full lg:w-2/5 rounded-lg  px-3  outline-0 "
          type="number"
          name="name"
          id="living"
          min={0}
          value={formState.livingRooms}
          onChange={(e) => {
            setState((prevState) => {
              return { ...prevState, livingRooms: e.target.value };
            });
          }}
        />
      </div>
      <div className="option option2  flex items-center  my-5   w-3/5 ">
        <label className="font-bold tracking-wider w-56" htmlFor="bathrooms">
          Bathrooms
        </label>
        <input
          className=" border-gray-300 border-0 shadow-md ml-2 bg-gray-100 w-full lg:w-2/5 rounded-lg  px-3  outline-0 "
          type="number"
          name="name"
          min={0}
          id="bathrooms"
          value={formState.bathrooms}
          onChange={(e) => {
            setState((prevState) => {
              return { ...prevState, bathrooms: e.target.value };
            });
          }}
        />
      </div>

      <div className="flex flex-col my-5 self-center  w-3/5 ">
        <p className="font-bold tracking-wider mb-1 self-start " htmlFor="name">
          Is the property furnished?
        </p>
        <div className=" flex my-5 self-center  w-full lg:w-10/12 bg-cyan-100 rounded-3xl p-1  ">
          <button
            className={
              isFurnished
                ? selectedProperty + ' rounded-tl-2xl rounded-bl-2xl'
                : buttonProperty
            }
            onClick={(e) => {
              e.preventDefault();

              setIsFurnished(true);
            }}
          >
            Yes
          </button>
          <button
            className={
              isFurnished
                ? buttonProperty
                : selectedProperty + ' rounded-tr-2xl rounded-br-2xl'
            }
            onClick={(e) => {
              e.preventDefault();
              setIsFurnished(false);
            }}
          >
            No
          </button>
        </div>
      </div>
      <PrevNext step={step} setStep={setStep} />
    </>
  );
};

export default Mid;
