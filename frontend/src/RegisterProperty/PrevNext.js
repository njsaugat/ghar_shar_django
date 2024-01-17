import React from "react";
import { progressSteps } from "./progressStepsArr";
const buttonProperty = `py-2 px-5 my-10 rounded-lg bg-gradient-to-t from-sky-400 to-cyan-100  tracking-wide text-black shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300`;

const PrevNext = ({ step, setStep }) => {
  return (
    <div className="flex items-center justify-center gap-5 buttons ">
      <div className="prev">
        <button
          className={
            step === 0
              ? buttonProperty +
                ` bg-gradient-to-t from-slate-400 to-slate-100 shadow-sm`
              : buttonProperty
          }
          disabled={step === 0 ? true : false}
          type="submit"
          onClick={() => {
            setStep((prevStep) => (prevStep === 0 ? 0 : prevStep - 1));
          }}
        >
          Prev
        </button>
      </div>

      <div>
        <button
          className={buttonProperty}
          type="sumbit"
          onClick={() => {
            // TODO: redirect to explore page
            setStep((prevStep) =>
              prevStep === progressSteps.length - 1
                ? progressSteps.length - 1
                : prevStep + 1
            );
          }}
        >
          {step === progressSteps.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default PrevNext;
