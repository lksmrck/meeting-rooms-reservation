import { FC, RefObject } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";
import { FiTwitter } from "react-icons/fi";
import { FiFacebook } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import { LandingRefsObject } from "../../types/types";

type FooterProps = {
  landingRefs: LandingRefsObject;
};

const socials = [
  { name: "Twitter", icon: <FiTwitter /> },
  { name: "Facebook", icon: <FiFacebook /> },
  { name: "Instagram", icon: <FiInstagram /> },
];

const Footer: FC<FooterProps> = ({ landingRefs }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { user } = useAuth();

  const clickLinkHandler = (refName: RefObject<HTMLDivElement>) => {
    const element = refName?.current;
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="flex flex-col justify-start  text-white bg-violet-800  shadow-sm mt-auto w-screen  relative ">
      <div className="  h-full flex flex-col justify-between ">
        <div className="flex justify-center [&>div]:mx-8 [&>div]:my-8  [&>div]:md:mx-20">
          <div
            className="mx-24 cursor-pointer"
            onClick={() => navigate("/home")}
          >
            {/*  <img alt="logo" src={logoDogFooter} height="60px" width="60px" /> */}
            <h1>logo</h1>
            <h4>Room Reserver</h4>
          </div>

          {pathname != "/home" ? (
            <div className="[&>a]:text-xs [&>a]:mt-1 text-gray-300 flex flex-col [&>a]:cursor-pointer  min-w-fit">
              <h1 className="mb-1 font-bold">Links</h1>
              <a onClick={() => navigate("/home")}>Home</a>
              {user && <a onClick={() => navigate("/datepick")}>Pick date</a>}
            </div>
          ) : (
            <div className="[&>a]:text-xs [&>a]:mt-1 text-gray-300 flex flex-col [&>a]:cursor-pointer">
              <h1 className="mb-1 font-bold">About</h1>
              <a onClick={() => clickLinkHandler(landingRefs.featuresRef)}>
                Features
              </a>
              <a onClick={() => clickLinkHandler(landingRefs.stepsRef)}>
                Steps
              </a>
              <a onClick={() => clickLinkHandler(landingRefs.referencesRef)}>
                References
              </a>
              <a onClick={() => clickLinkHandler(landingRefs.contactRef)}>
                Get started
              </a>
            </div>
          )}

          <div className="flex flex-col [&>div]:m-0.5 [&>div]:flex [&>div]:items-center text-gray-300 ">
            <h1 className="mb-1 font-bold">Social</h1>
            {socials.map((social: any) => {
              return (
                <div>
                  <IconButton
                    aria-label="twitter"
                    colorScheme="purple" /* sx={{ color: "#e6fcfc" }} */
                    size="xs"
                    sx={{ color: "#d1d5db" /* width: "13px" */ }}
                    isRound={true}
                  >
                    {social.icon}
                  </IconButton>
                  <h2 className="text-xs ml-1 cursor-pointer">{social.name}</h2>
                </div>
              );
            })}
          </div>
        </div>
        <hr />
        <div className="flex justify-between text-gray-400 text-xxs items-center [&>p]:mx-8">
          <p>&copy;{new Date().getFullYear()} Room Reserver®</p>
          <p className="text-rightx">Made with ❤️ in Střížkov</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
