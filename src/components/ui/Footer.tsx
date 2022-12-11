import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";
import { FiTwitter } from "react-icons/fi";
import { FiFacebook } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="flex flex-col justify-end  text-white bg-violet-800  shadow-sm mt-auto w-screen  relative h-40">
      <div className=" border border-red-600">
        <div className="">
          <div className=" ml-2" onClick={() => navigate("/")}>
            {/*  <img alt="logo" src={logoDogFooter} height="60px" width="60px" /> */}
            <h4>Room Reserver</h4>
          </div>
        </div>
        <hr />
        <div className="flex justify-between text-gray-300 text-sm items-center">
          <p className="ml-2">
            &copy;{new Date().getFullYear()} Room Reserver | All rights reserved
          </p>
          <p className="text-rightx">Made with ❤️ in Střížkov</p>
          <div className="[&>*]:m-0.5 mr-2">
            <IconButton
              aria-label="twitter"
              colorScheme="purple" /* sx={{ color: "#e6fcfc" }} */
              size="sm"
              sx={{ color: "#d1d5db" }}
            >
              <FiTwitter size={20} />
            </IconButton>
            <IconButton
              aria-label="facebook"
              colorScheme="purple" /* sx={{ color: "#e6fcfc" }} */
              size="sm"
              sx={{ color: "#d1d5db" }}
            >
              <FiFacebook size={20} />
            </IconButton>
            <IconButton
              aria-label="instagram"
              colorScheme="purple" /* sx={{ color: "#e6fcfc" }} */
              size="sm"
              sx={{ color: "#d1d5db" }}
            >
              <FiInstagram size={20} />
            </IconButton>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
