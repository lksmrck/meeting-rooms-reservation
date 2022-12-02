import React from "react";
import { Button } from "@chakra-ui/react";

const Title = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-violet-300 to-violet-400  h-3/4 relative ">
      <div
        className="bg-violet-800 w-full h-full absolute top-0 left-0 "
        style={{ clipPath: "circle(400px at right -130px)" }}
      ></div>
      <div className="flex mr-44 lg:mr-0  h-30 w-40 ">
        <div
          className="bg-violet-800 w-14 h-11 "
          style={{ clipPath: "circle(20px at center)" }}
        ></div>
        <div
          className="bg-violet-800 w-28 h-20  "
          style={{ clipPath: "circle(40px at center)" }}
        ></div>
        <div
          className="bg-violet-800 w-14 h-11 "
          style={{ clipPath: "circle(20px at center)" }}
        ></div>
      </div>

      <h1 className="  text-4xl text-center text-neutral-700 z-10">
        Comfortly reserve your company conference rooms with few clicks.
      </h1>
      <div className="flex justify-center mt-5">
        <Button colorScheme={"teal"}>Get Started</Button>
      </div>
    </div>
  );
};

export default Title;
