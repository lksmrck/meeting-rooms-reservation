import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";
import { FiTwitter } from "react-icons/fi";
import { FiFacebook } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className=" text-white bg-violet-800 pt-28 shadow-sm mt-auto w-screen  relative h-22">
      <div className="containerx">
        <div className="rowx">
          <div className="colx" onClick={() => navigate("/")}>
            {/*  <img alt="logo" src={logoDogFooter} height="60px" width="60px" /> */}
            <h4>Room Reserver</h4>
          </div>
          <div className="row-iconsx">
            <IconButton
              aria-label="twitter"
              colorScheme="purple" /* sx={{ color: "#e6fcfc" }} */
            >
              <FiTwitter size={25} />
            </IconButton>
            <IconButton
              aria-label="facebook"
              colorScheme="purple" /* sx={{ color: "#e6fcfc" }} */
            >
              <FiFacebook size={25} />
            </IconButton>
            <IconButton
              aria-label="instagram"
              colorScheme="purple" /* sx={{ color: "#e6fcfc" }} */
            >
              <FiInstagram size={25} />
            </IconButton>
          </div>
        </div>
        <hr />
        <div className="rowx">
          <p className="text-leftx">
            &copy;{new Date().getFullYear()} Room Reserver | All rights reserved
          </p>
          <p className="text-rightx">Made with ❤️ in Střížkov</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
