import React from "react";
import { Button } from "@chakra-ui/react";

const Title = () => {
  return (
    <div className="flex flex-col mx-auto justify-center bg-gradient-to-r from-violet-300 to-violet-400  h-3/4 relative ">
      <div
        className="bg-purple-800 w-full h-full absolute top-0 left-0 "
        style={{ clipPath: "circle(400px at right -150px)" }}
      ></div>
      <div
        className="bg-purple-800 w-20 h-20 absolute top-80 left-32 "
        style={{ clipPath: "circle(40px at center)" }}
      ></div>
      <div
        className="bg-purple-800 w-11 h-11 absolute top-72 left-52 "
        style={{ clipPath: "circle(20px at center)" }}
      ></div>
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
