import { forwardRef } from "react";
import Carousel from "../../components/landing/Carousel";
import "react-responsive-carousel/lib/styles/carousel.css";
import { carouselSlides } from "../../data/data";
import Circle from "../../components/landing/Circle";

const Reference = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      className="w-full min-h-screen md:h-full flex justify-center items-center bg-cover  bg-center bg-no-repeat bg-carouselWaves relative  "
      ref={ref}
    >
      <Circle additionalTWStyles="top-72 left-2/3 md:left-1/2 md:top-3/4" />
      <Circle additionalTWStyles="top-72 left-1/4 " />
      <Circle additionalTWStyles="top-130 left-1/4 md:top-110 md:left-2/4" />
      <Circle additionalTWStyles="top-120 left-3/4 md:top-130" />
      <Carousel slides={carouselSlides} />
    </div>
  );
});

export default Reference;
