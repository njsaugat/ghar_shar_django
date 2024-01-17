import React, { useContext } from "react";
import PrevNext from "./PrevNext";
import { FormContext } from "./RegisterProperty";

const Final = () => {
  const { formState, setState } = useContext(FormContext);
  const { step, setStep } = useContext(FormContext);

  return (
    <>
      <div className="flex flex-col self-center w-3/5 my-5 option " key={3}>
        <label className="mb-1 font-bold tracking-wider" htmlFor="price">
          Price
        </label>
        <input
          className="w-full px-3 py-2 bg-gray-100 border-0 border-gray-300 rounded-lg shadow-md outline-0 "
          id="price"
          type="number"
          name="price"
          min={0}
          required
          placeholder="Rs."
          value={formState.price}
          onChange={(e) => {
            setState((prevState) => {
              return { ...prevState, price: e.target.value };
            });
          }}
        />
      </div>
      <div className="flex flex-col self-center w-3/5 my-5 option ">
        <label className="mb-1 font-bold tracking-wider" htmlFor="address">
          Address
        </label>
        <input
          className="w-full px-3 py-2 bg-gray-100 border-0 border-gray-300 rounded-lg shadow-md outline-0 "
          type="text"
          name="address"
          id="address"
          required
          value={formState.address}
          onChange={(e) => {
            setState((prevState) => {
              return { ...prevState, address: e.target.value };
            });
          }}
        />
      </div>
      <div className="flex flex-col self-center w-3/5 my-5 option ">
        <label className="mb-1 font-bold tracking-wider" htmlFor="description">
          Description
        </label>
        <textarea
          className="w-full px-3 py-2 bg-gray-100 border-0 border-gray-300 rounded-lg shadow-md resize-none outline-0 h-28 "
          type="text"
          name="description"
          id="description"
          required
          value={formState.description}
          onChange={(e) => {
            setState((prevState) => {
              return { ...prevState, description: e.target.value };
            });
          }}
        ></textarea>
      </div>
      <PrevNext step={step} setStep={setStep} />
    </>
  );
};

export default Final;
