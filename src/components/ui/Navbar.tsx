import React, { useContext } from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../state/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { Button } from "@chakra-ui/react";
/* import Button from "./MyButton"; */

const Navbar = () => {
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  if (!authContext) return null;
  const { user, setUser } = authContext;

  const onClickButton = () => {
    if (user) {
      setUser(null);
      localStorage.removeItem("setupTime");
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
    <section className="h-20 bg-violet-800 flex  shadow-lg shadow-slate-300">
      <nav className="flex justify-between items-center w-screen">
        <ul className="flex items-center">
          <li className=" ml-5 text-white">Room Reserver</li>
        </ul>
        {/*  <Button text={user ? "Logout" : "Sign In"} onClick={onClickButton} /> */}
        <div className="mr-5">
          <Button colorScheme="teal" size="md" onClick={onClickButton}>
            {user ? "Logout" : "Sign In"}{" "}
          </Button>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
