import clickMeArrow from "../../assets/landingPics/clickMeArrow.svg";
import { useMediaQuery } from "@chakra-ui/react";

const ClickMeArrow = () => {
  const [mediumScreenMin] = useMediaQuery("(min-width: 768px)");

  return (
    <div className=" flex animate-arrowCollors  justify-end w-96 md:w-155  ">
      <div className="w-2/3">
        <img
          src={clickMeArrow}
          alt="arrow"
          width={mediumScreenMin ? "350px" : "250px"}
          className=" -mb-24 md:-mb-30 ml-6 md:ml-4 "
        />
      </div>
    </div>
  );
};

export default ClickMeArrow;
