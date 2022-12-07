import React from "react";

import { Carousel } from "react-responsive-carousel";
/* import "react-responsive-carousel/lib/styles/carousel.min.css"; */
import "react-responsive-carousel/lib/styles/carousel.css";
import CR from "../../../assets/CR.jpeg";
import "react-responsive-carousel/lib/styles/glass.css";

const Reference = () => {
  const slides = [
    { title: "First title", image: CR },
    { title: "First title", image: CR },
    { title: "First title", image: CR },
    { title: "First title", image: CR },
  ];

  return (
    <div className="w-full flex justify-center intems-center bg-cover  bg-center bg-no-repeat bg-carouselWaves relative pb-10">
      <div className="absolute w-16 h-16 md:w-28 md:h-28 top-40 left-2/3 bg-white rounded-full"></div>
      <div className="absolute w-16 h-16 md:w-28 md:h-28 top-64 left-2/4 bg-white rounded-full"></div>
      <div className="absolute w-16 h-16 md:w-28 md:h-28 top-32 left-1/4 bg-white rounded-full"></div>
      <div className="w-1/2 mt-48 glass  ">
        <Carousel
          showArrows={
            true
          } /* onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb} */
        >
          {slides.map((slide: any) => (
            <div className="w-full flex h-64  rounded-lg  ">
              <div className="w-1/2  ">
                <img src={slide.image} className="rounded-lg" />
              </div>
              <h2>{slide.title}</h2>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Reference;
