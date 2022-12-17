import { forwardRef } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.css";
import { carouselSlides } from "../../common/common";
import "react-responsive-carousel/lib/styles/glass.css";
import { CarouselSlide } from "../../types/types";

const Reference = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      className="w-full h-content md:h-full flex justify-center items-center bg-cover  bg-center bg-no-repeat bg-carouselWaves relative pb-10 "
      ref={ref}
    >
      <div className="absolute w-28 h-28 top-40 left-2/3 md:left-1/2 bg-white rounded-full"></div>
      <div className="absolute w-28 h-28 top-110  md:top-80 left-3/4  bg-white rounded-full"></div>
      <div className="absolute w-28 h-28 top-64 md:top-32 left-1/4 md:left-1/3 bg-white rounded-full"></div>
      <div className="w-2/3 md:w-1/2 max-w-xs md:max-w-2xl h-80 md:h-64 mt-48 glass">
        <Carousel
          showThumbs={false}
          showArrows={
            true
          } /* onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb} */
          className="h-80 md:h-64 "
          autoPlay
          interval={3000}
          infiniteLoop
          showStatus={false}
        >
          {carouselSlides.map((slide: CarouselSlide) => (
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
        </Carousel>
      </div>
    </div>
  );
});

export default Reference;
