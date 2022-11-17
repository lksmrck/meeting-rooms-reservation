import React from "react";
import { FiTarget } from "react-icons/fi";
import { MdOutlineSportsScore } from "react-icons/md";
import { GiClick } from "react-icons/gi";

const Features = () => {
  //Tady 3 výhody + react icons

  return (
    <div className="h-3/4">
      <div className="flex justify-center  bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 items-center h-full">
        <ul className="flex flex-col  m-10 [&>li]:w-64 lg:[&>li]:w-72 [&>li]:h-44 lg:[&>li]:h-64 [&>li]:bg-indigo-200 [&>li]:rounded-lg [&>li]:m-5 lg:flex-row ">
          <li className="animate-floatUp flex flex-col justify-center items-center hover:shadow-2xl  cursor-pointer hover:bg-indigo-300">
            <FiTarget size={100} color="#319795" />
            <h1 className="text-4xl mt-4">Simple</h1>
          </li>
          <li className="animate-floatDown flex flex-col justify-center items-center hover:shadow-2xl cursor-pointer hover:bg-indigo-300">
            <MdOutlineSportsScore size={100} color="#319795" />
            <h1 className="text-4xl mt-4">Fast</h1>
          </li>
          <li className="animate-floatUp  flex flex-col justify-center items-center hover:shadow-2xl  cursor-pointer hover:bg-indigo-300">
            <GiClick size={100} color="#319795" />
            <h1 className="text-4xl mt-4">Easy to learn</h1>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Features;
