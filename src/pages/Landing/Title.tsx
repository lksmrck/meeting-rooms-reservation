import React, { RefObject } from "react";
import { Button } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";

type TitleProps = {
  contactRef: RefObject<HTMLDivElement>;
};

const Title: React.FC<TitleProps> = ({ contactRef }) => {
  const [largeScreen] = useMediaQuery("(min-width: 1024px)");
  /*   const [smallScreen] = useMediaQuery("(min-width: 640pxpx)"); */

  const buttonClickHandler = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="flex flex-col items-center justify-center bg-cover  bg-center bg-no-repeat   bg-titleWaves h-screen relative ">
      <div
        className="bg-violet-800 w-full h-full absolute top-0 left-0 "
        style={{
          clipPath: largeScreen
            ? "circle(350px at right -130px)"
            : "circle(250px at right -130px)",
        }}
      ></div>

      <h1 className="text-4xl md:text-6xl font-bold text-center text-neutral-800 z-10 font-outline mx-5">
        Comfortly reserve your company
        <span className=" font-solid font-normal text-neutral-900">
          {" "}
          conference rooms
        </span>{" "}
        with few clicks.
      </h1>
      <div className="flex justify-center mt-5">
        <Button
          colorScheme={"teal"}
          onClick={buttonClickHandler}
          className="animate-buttonGlowing"
        >
          Get Started
        </Button>
      </div>
    </section>
  );
};

export default Title;
