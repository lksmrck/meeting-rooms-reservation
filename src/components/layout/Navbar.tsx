import React from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";

import Button from "./MyButton";

const Navbar = () => {
  return (
    <section className="h-20 bg-th_blue_two flex">
      <nav className="py-10 mb-12 flex justify-between items-center w-screen">
        <ul className="flex items-center">
          <li className="mr-2 ml-5">Room Reserver</li>
          <li>
            <BsFillMoonStarsFill />
          </li>
        </ul>
        <Button text="Sign In" onClick={() => "pushni me"} />
      </nav>
    </section>
  );
};

export default Navbar;
