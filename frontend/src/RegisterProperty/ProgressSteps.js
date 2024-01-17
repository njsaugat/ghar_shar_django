import React from "react";
import { progressSteps } from "./progressStepsArr";
const circleProperty = `w-10 h-10 border-2 rounded-full flex justify-center items-center transition-all  duration-500`;
const activeCircle = `${circleProperty}  w-11 h-11 border-sky-400 border-4 rounded-full transition-all duration-500 `;
const currentCircle = `${circleProperty} border-0 border-slate-100 bg-gradient-to-r from-sky-400 to-cyan-100`;

const lineProperty = `line w-20 lg:w-24 h-1.5 bg-slate-300 transition-all duration-500 `;
const activeLine = `${lineProperty}  bg-gradient-to-r from-sky-500 to-cyan-400`;

const ProgressSteps = ({ step, setStep }) => {
  return (
    <>
      <div className="flex items-center justify-center w-screen ">
        {progressSteps.map((progressStep, index) => {
          return (
            <div className="flex items-center justify-center " key={index}>
              <div
                className={
                  step >= index
                    ? step === index
                      ? currentCircle
                      : activeCircle
                    : circleProperty
                }
              >
                {progressStep + 1}
              </div>
              {index < progressSteps.length - 1 && (
                <div
                  className={step - 1 >= index ? activeLine : lineProperty}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProgressSteps;
