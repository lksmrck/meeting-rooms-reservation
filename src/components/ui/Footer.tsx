import React from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";
import { FiTwitter } from "react-icons/fi";
import { FiFacebook } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

const Footer = ({ landingRefs }: any) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAuth();

  const onClickHandler = async (refName: any) => {
    const element = refName.current;
    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="flex flex-col justify-start  text-white bg-violet-800  shadow-sm mt-auto w-screen  relative ">
      <div className=" border h-full flex flex-col justify-between ">
        <div className="flex justify-center [&>div]:mx-8 [&>div]:my-8  [&>div]:md:mx-20">
          <div className="mx-24" onClick={() => navigate("/home")}>
            {/*  <img alt="logo" src={logoDogFooter} height="60px" width="60px" /> */}
            <h1>logo</h1>
            <h4>Room Reserver</h4>
          </div>
          {user ? (
            <div className="[&>a]:text-xs [&>a]:mt-1 text-gray-300 flex flex-col [&>a]:cursor-pointer  min-w-fit">
              <h1 className="mb-1 font-bold">Links</h1>
              <a onClick={() => navigate("/home")}>Home</a>
              <a onClick={() => navigate("/datepick")}>Pick date</a>
            </div>
          ) : (
            <div className="[&>a]:text-xs [&>a]:mt-1 text-gray-300 flex flex-col [&>a]:cursor-pointer">
              <h1 className="mb-1 font-bold">About</h1>
              <a onClick={() => onClickHandler(landingRefs.featuresRef)}>
                Features
              </a>
              <a onClick={() => onClickHandler(landingRefs.stepsRef)}>Steps</a>
              <a onClick={() => onClickHandler(landingRefs.referencesRef)}>
                References
              </a>
              <a onClick={() => onClickHandler(landingRefs.contactRef)}>
                Get started
              </a>
            </div>
          )}

          <div className="flex flex-col [&>div]:m-0.5 [&>div]:flex [&>div]:items-center text-gray-300 ">
            <h1 className="mb-1 font-bold">Social</h1>
            <div>
              <IconButton
                aria-label="twitter"
                colorScheme="purple" /* sx={{ color: "#e6fcfc" }} */
                size="xs"
                sx={{ color: "#d1d5db" /* width: "13px" */ }}
                isRound={true}
              >
                <FiTwitter size={10} />
              </IconButton>
              <h2 className="text-xs ml-1 cursor-pointer">Twitter</h2>
            </div>
            <div>
              <IconButton
                aria-label="facebook"
                colorScheme="purple" /* sx={{ color: "#e6fcfc" }} */
                size="xs"
                sx={{ color: "#d1d5db" /* width: "13px" */ }}
                isRound={true}
              >
                <FiFacebook size={10} />
              </IconButton>
              <h2 className="text-xs ml-1 cursor-pointer ">Facebook</h2>
            </div>
            <div>
              <IconButton
                aria-label="instagram"
                colorScheme="purple" /* sx={{ color: "#e6fcfc" }} */
                size="xs"
                sx={{ color: "#d1d5db" }}
                variant="solid"
                isRound={true}
              >
                <FiInstagram size={10} />
              </IconButton>
              <h2 className="text-xs ml-1 cursor-pointer">Instagram</h2>
            </div>
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
