import React from "react";

const Features = () => {
  //Tady 3 výhody + react icons

  return (
    <div>
      <div className="flex justify-center mt-7">
        <ul className="flex flex-col  m-10 [&>li]:w-72 [&>li]:h-64 [&>li]:bg-orange-400 [&>li]:rounded-lg [&>li]:m-5 lg:flex-row">
          <li>Simple</li>
          <li>Fast</li>
          <li>Easy to learn</li>
        </ul>
      </div>
    </div>
  );
};
export default Features;
