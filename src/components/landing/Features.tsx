import React from "react";

const Features = () => {
  //Tady 3 výhody + react icons

  return (
    <div className="h-3/4">
      <div className="flex justify-center  bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 items-center h-full">
        <ul className="flex flex-col  m-10 [&>li]:w-64 lg:[&>li]:w-72 [&>li]:h-40 lg:[&>li]:h-64 [&>li]:bg-orange-400 [&>li]:rounded-lg [&>li]:m-5 lg:flex-row">
          <li>Simple</li>
          <li>Fast</li>
          <li>Easy to learn</li>
        </ul>
      </div>
    </div>
  );
};
export default Features;
