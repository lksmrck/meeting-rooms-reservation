import { RefObject, FC } from "react";
import { Button } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import booking from "../../assets/landingPics/booking.svg";

type TitleProps = {
  contactRef: RefObject<HTMLDivElement>;
};

const Title: FC<TitleProps> = ({ contactRef }) => {
  const [largeScreen] = useMediaQuery("(min-width: 1024px)");

  const buttonClickHandler = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="flex flex-col md:flex-row  items-center justify-center bg-cover  bg-center bg-no-repeat bg-titleWaves h-screen relative ">
      <div
        className="bg-violet-800 w-full h-full absolute top-0 left-0 "
        style={{
          clipPath: largeScreen
            ? "circle(350px at right -130px)"
            : "circle(250px at right -130px)",
        }}
      ></div>
      <div className="mb-30 flex flex-col [&>h1]:text-center [&>h1]:lg:text-left [&>h1]:text-6xl md:mr-20  w-96 md:w-110 mx-10 ">
        <h1 className="font-outline font-bold text-neutral-800 z-10 ">Book</h1>
        <h1 className=" font-solid text-neutral-900 ">meeting rooms</h1>
        <h1 className="font-outline font-bold text-neutral-800 ">
          without stress
        </h1>
        <h3 className="text-center lg:text-left mt-5">
          Comfortly administrate and reserve your company meeting rooms with
          only few clicks. Let your employees manage meetings themselves.
        </h3>
        <div className="flex justify-center lg:justify-start mt-10 ">
          <Button
            colorScheme={"teal"}
            onClick={buttonClickHandler}
            className="animate-buttonGlowing"
          >
            Get Started
          </Button>
        </div>
      </div>
      <div className=" hidden lg:block w-130 mb-30">
        <img src={booking} />
      </div>
    </section>
  );
};

export default Title;
