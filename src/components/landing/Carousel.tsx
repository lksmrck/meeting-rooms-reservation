import { FC } from "react";
import { Carousel as ReactCarousel } from "react-responsive-carousel";
import { CarouselSlide } from "../../types/types";
import "./glass.css";

type CarouselProps = {
  slides: CarouselSlide[];
};

const Carousel: FC<CarouselProps> = ({ slides }) => {
  return (
    <div className="w-2/3 md:w-1/2 max-w-xs md:max-w-2xl h-110 md:h-64 mt-48 md:min-w-min glass overflow-hidden">
      <ReactCarousel
        showThumbs={false}
        showArrows={true}
        className="h-80 md:h-64 "
        autoPlay
        interval={5000}
        infiniteLoop
        showStatus={false}
      >
        {slides.map((slide: CarouselSlide) => (
          <div
            key={slide.person}
            className="w-full flex flex-col md:flex-row h-110  md:h-64 rounded-lg  "
          >
            <div className="h-1/2 md:h-full md:w-1/2 ">
              <img
                src={slide.image}
                alt="reference"
                className=" rounded-t-lg md:rounded-l-lg md:rounded-tr-none h-full w-full "
              />
            </div>
            <div className=" flex flex-col justify-center items-center h-1/2 md:h-full  md:w-1/2 [&>*]:mx-3  ">
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
