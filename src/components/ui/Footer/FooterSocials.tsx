import { FC, ReactNode } from "react";
import { IconButton } from "@chakra-ui/react";
import { FiTwitter } from "react-icons/fi";
import { FiFacebook } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";

const FooterSocials: FC = () => {
  const socials = [
    { name: "Twitter", icon: <FiTwitter /> },
    { name: "Facebook", icon: <FiFacebook /> },
    { name: "Instagram", icon: <FiInstagram /> },
  ];
  return (
    <div className="flex flex-col [&>div]:m-0.5 [&>div]:flex [&>div]:items-center text-gray-300 ">
      <h1 className="mb-1 font-bold">Social</h1>
      {socials.map((social: { name: string; icon: ReactNode }) => {
        return (
          <div key={social.name} className="cursor-pointer hover:text-gray-400">
            <IconButton
              aria-label="twitter"
              colorScheme="purple"
              size="xs"
              sx={{ color: "#d1d5db" }}
              isRound={true}
            >
              {social.icon}
            </IconButton>
            <h2 className="text-xs ml-1  ">{social.name}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default FooterSocials;
