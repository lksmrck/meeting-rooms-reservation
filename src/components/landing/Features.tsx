import React from "react";
import { FiTarget } from "react-icons/fi";
import { MdOutlineSportsScore } from "react-icons/md";
import { GiClick } from "react-icons/gi";

const Features = () => {
  return (
    <div className="h-3/4">
      <div className="flex justify-center  bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 items-center h-full">
        <ul className="flex flex-col  m-10 [&>li]:w-64 lg:[&>li]:w-72   [&>li]:bg-indigo-200 [&>li]:rounded-lg [&>li]:m-3 [&>li]:lg:m-5 lg:flex-row ">
          <li className="animate-floatUp flex flex-col justify-center items-center hover:shadow-2xl cursor-pointer hover:bg-indigo-300">
            <FiTarget
              color="#319795"
              className="h-2/5 w-2/5 lg:h-1/2 lg:w-1/2 "
            />
            <h1 className="text-2xl lg:text-4xl mt-2">Simple</h1>
          </li>
          <li className="animate-floatDown flex flex-col justify-center items-center hover:shadow-2xl cursor-pointer hover:bg-indigo-300">
            <MdOutlineSportsScore
              color="#319795"
              className="h-2/5 w-2/5 lg:h-1/2 lg:w-1/2"
            />
            <h1 className="text-2xl lg:text-4xl mt-2">Fast</h1>
          </li>
          <li className="animate-floatUp  flex flex-col justify-center items-center hover:shadow-2xl cursor-pointer hover:bg-indigo-300">
            <GiClick
              color="#319795"
              className="h-2/5 w-2/5 lg:h-1/2 lg:w-1/2"
            />
            <h1 className="text-2xl lg:text-4xl mt-2">Easy to learn</h1>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Features;
