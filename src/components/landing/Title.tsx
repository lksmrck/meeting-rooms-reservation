import React from "react";
import { Button } from "@chakra-ui/react";

const Title = () => {
  return (
    <div className="flex flex-col mx-auto justify-center bg-gradient-to-r from-violet-300 to-violet-400  h-3/4 ">
      <h1 className="  text-4xl text-center text-neutral-700">
        Comfortly reserve your company conference rooms with few clicks.
      </h1>
      <div className="flex justify-center mt-5">
        <Button colorScheme={"teal"}>Get Started</Button>
      </div>
    </div>
  );
};

export default Title;
