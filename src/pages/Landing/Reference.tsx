import { forwardRef } from "react";
import Carousel from "../../components/landing/Carousel";
import "react-responsive-carousel/lib/styles/carousel.css";
import { carouselSlides } from "../../data/data";
import "react-responsive-carousel/lib/styles/glass.css";
import Circle from "../../components/landing/Circle";

const Reference = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      className="w-full h-content md:h-full flex justify-center items-center bg-cover  bg-center bg-no-repeat bg-carouselWaves relative pb-10 "
      ref={ref}
    >
      <Circle additionalTWStyles="top-44 left-2/3 md:left-1/2" />
      <Circle additionalTWStyles="top-48 left-1/4 md:top-32 md:left-1/3" />
      <Circle additionalTWStyles="top-130 left-1/4 md:top-110 md:left-1/3" />
      <Circle additionalTWStyles="top-120 left-3/4 md:top-80" />
      <Carousel slides={carouselSlides} />
    </div>
  );
});

export default Reference;
