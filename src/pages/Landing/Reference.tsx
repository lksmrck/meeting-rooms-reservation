import { forwardRef } from "react";
import Carousel from "../../components/landing/Carousel";
import "react-responsive-carousel/lib/styles/carousel.css";
import { carouselSlides } from "../../data/data";
import "react-responsive-carousel/lib/styles/glass.css";
import { Circle } from "@chakra-ui/react";

const Reference = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      className="w-full h-content md:h-full flex justify-center items-center bg-cover  bg-center bg-no-repeat bg-carouselWaves relative pb-10 "
      ref={ref}
    >
      <div className="absolute w-28 h-28 top-40 left-2/3 md:left-1/2 bg-white rounded-full"></div>
      <div className="absolute w-28 h-28 top-110  md:top-80 left-3/4  bg-white rounded-full"></div>
      <div className="absolute w-28 h-28 top-64 md:top-32 left-1/4 md:left-1/3 bg-white rounded-full"></div>

      {/* DODELAT */}
      <Circle top="105" /* smLeft="2/4" mdLeft="2/4" */ left="3/4" />
      <Carousel slides={carouselSlides} />
    </div>
  );
});

export default Reference;
