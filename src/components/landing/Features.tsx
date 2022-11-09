import React from "react";
import { FiTarget } from "react-icons/fi";
import { MdOutlineSportsScore } from "react-icons/md";
import { GiClick } from "react-icons/gi";

const Features = () => {
  //Tady 3 výhody + react icons

  return (
    <div className="h-3/4">
      <div className="flex justify-center  bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 items-center h-full">
        <ul className="flex flex-col  m-10 [&>li]:w-64 lg:[&>li]:w-72 [&>li]:h-40 lg:[&>li]:h-64 [&>li]:bg-indigo-200 [&>li]:rounded-lg [&>li]:m-5 lg:flex-row">
          <li className="flex flex-col justify-center items-center">
            <FiTarget size={100} color="red" />{" "}
            <h1 className="text-4xl mt-4">Simple</h1>
          </li>
          <li className="flex flex-col justify-center items-center">
            <MdOutlineSportsScore size={100} color="red" />
            <h1 className="text-4xl mt-4">Fast</h1>
          </li>
          <li className="flex flex-col justify-center items-center">
            <GiClick size={100} color="red" />{" "}
            <h1 className="text-4xl mt-4">Easy to learn</h1>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Features;
