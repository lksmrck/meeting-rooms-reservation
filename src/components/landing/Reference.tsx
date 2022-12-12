import React from "react";

import { Carousel } from "react-responsive-carousel";
/* import "react-responsive-carousel/lib/styles/carousel.min.css"; */
import "react-responsive-carousel/lib/styles/carousel.css";
import CR from "../../assets/CR.jpeg";
import "react-responsive-carousel/lib/styles/glass.css";

const Reference = () => {
  const slides = [
    { title: "First title", company: "company 1", image: CR },
    { title: "Second title", company: "company 2", image: CR },
    { title: "Third title", company: "company 3", image: CR },
    { title: "Fourth title", company: "company 4", image: CR },
  ];

  return (
    <section className="w-full flex justify-center intems-center bg-cover  bg-center bg-no-repeat bg-carouselWaves relative pb-10 ">
      <div className="absolute w-16 h-16 md:w-28 md:h-28 top-40 left-2/3 bg-white rounded-full"></div>
      <div className="absolute w-16 h-16 md:w-28 md:h-28 top-64 left-2/4 bg-white rounded-full"></div>
      <div className="absolute w-16 h-16 md:w-28 md:h-28 top-32 left-1/4 bg-white rounded-full"></div>
      <div className="w-2/3 md:w-1/2 md:max-w-2xl mt-48 glass">
        <Carousel
          showArrows={
            true
          } /* onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb} */
          className="h-40 md:h-64"
          autoPlay
          interval={3000}
          infiniteLoop
          showStatus={false}
        >
          {slides.map((slide: any) => (
            <div className="w-full flex h-40 md:h-64  rounded-lg  ">
              <div className="w-1/2">
                <img src={slide.image} className="rounded-lg h-full " />
              </div>
              <div className="flex flex-col justify-center items-center  w-1/2 ">
                <h2 className="font-solid text-2xl">"{slide.title}"</h2>
                <h4 className="text-sm">-{slide.company}-</h4>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Reference;
