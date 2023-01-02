import { FC } from "react";
import logoBoyInSuit from "../../assets/logoBoyInSuit.png";
import { useMediaQuery } from "@chakra-ui/react";

const LogoImage: FC = () => {
  const [mediumScreenMin] = useMediaQuery("(min-width: 768px)");

  return (
    <img
      src={logoBoyInSuit}
      alt="logo_boy_in_suit"
      width={mediumScreenMin ? "55px" : "40px"}
    />
  );
};

export default LogoImage;
