import React, { useContext } from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../state/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

import Button from "./MyButton";

const Navbar = () => {
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  if (!authContext) return null;
  const { user, setUser } = authContext;

  const onClickButton = () => {
    if (user) {
      setUser(null);
      signOut(auth)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    navigate("/login");
  };

  return (
    <section className="h-20 bg-th_blue_two flex">
      <nav className="py-10 mb-12 flex justify-between items-center w-screen">
        <ul className="flex items-center">
          <li className="mr-2 ml-5">Room Reserver</li>
          <li>
            <BsFillMoonStarsFill />
          </li>
        </ul>
        <Button text={user ? "Logout" : "Sign In"} onClick={onClickButton} />
      </nav>
    </section>
  );
};

export default Navbar;
