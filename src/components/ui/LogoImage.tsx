import RRlogo from "../../assets/RRlogo.svg";
import { FC } from "react";

const LogoImage: FC = () => {
  return (
    /*   <div
      className="h-6 md:h-6 w-5 md:w-5   rounded-lg  shadow-lg animate-colorsSwitch "
      style={{ borderRadius: "20% 60% 15% 60%" }}
    ></div> */

    <img src={RRlogo} alt="" className="animate-logoColors h-10 w-10" />
  );
};

export default LogoImage;
