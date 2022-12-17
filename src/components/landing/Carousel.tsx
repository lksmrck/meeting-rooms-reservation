import React from "react";
import { Carousel as ReactCarousel } from "react-responsive-carousel";
import { CarouselSlide } from "../../types/types";

type CarouselProps = {
  slides: CarouselSlide[];
};

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  return (
    <div className="w-2/3 md:w-1/2 max-w-xs md:max-w-2xl h-80 md:h-64 mt-48 glass">
      <ReactCarousel
        showThumbs={false}
        showArrows={true}
        className="h-80 md:h-64 "
        autoPlay
        interval={3000}
        infiniteLoop
        showStatus={false}
      >
        {slides.map((slide: CarouselSlide) => (
          <div className="w-full flex flex-col md:flex-row h-80 md:h-64 rounded-lg  ">
            <div className="h-1/2 md:h-full md:w-1/2">
              <img src={slide.image} className="rounded-lg h-full " />
            </div>
            <div className="flex flex-col justify-center items-center h-1/2 md:h-full  md:w-1/2 ">
              <h2 className="font-solid text-xl md:text-2xl text-black">
                "{slide.title}"
              </h2>
              <h3 className=" text-base md:text-lg">{slide.person}</h3>
              <h4 className="text-sm">-{slide.company}-</h4>
            </div>
          </div>
        ))}
      </ReactCarousel>
    </div>
  );
};

export default Carousel;
