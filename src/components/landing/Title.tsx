import React from "react";
import { Button } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";

const Title = () => {
  const [largeScreen] = useMediaQuery("(min-width: 1024px)");
  /*   const [smallScreen] = useMediaQuery("(min-width: 640pxpx)"); */

  return (
    <section
      className="flex flex-col items-center justify-center bg-cover  bg-center bg-no-repeat   bg-titleWaves h-screen relative "
      /*   style={{ aspectRatio: "960/300" }} */
      /* bg-cover  bg-center bg-no-repeat */
    >
      <div
        className="bg-violet-800 w-full h-full absolute top-0 left-0 "
        style={{
          clipPath: largeScreen
            ? "circle(350px at right -130px)"
            : "circle(250px at right -130px)",
        }}
      ></div>
      <div className="flex justify-start lg:mr-0  h-30 w-40 ">
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

      <h1 className="text-4xl md:text-6xl font-bold text-center text-neutral-800 z-10 font-outline mx-5">
        Comfortly reserve your company
        <span className=" font-solid font-normal text-neutral-900">
          {" "}
          conference rooms
        </span>{" "}
        with few clicks.
      </h1>
      <div className="flex justify-center mt-5">
        <Button colorScheme={"teal"}>Get Started</Button>
      </div>
    </section>
  );
};

export default Title;
