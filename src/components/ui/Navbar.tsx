import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { Button, IconButton } from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import AppContext from "../../state/AppContext";
import { ADMIN } from "../../common/constants";
import HamburgerMenu from "./HamburgerMenu";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, setUser } = useAuth();
  const { setError } = useContext(AppContext);

  const loginLogoutHandler = () => {
    if (user) {
      setUser(null);
      localStorage.clear();
      signOut(auth)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          setError({ error: true, message: error.message });
        });
    }
    navigate("/login");
  };

  return (
    <section className="h-20 bg-violet-800 flex shadow-lg shadow-slate-300">
      <nav className="flex justify-between items-center w-screen">
        <ul className="flex items-center">
          <li
            className=" lg:ml-5 ml-2 text-white cursor-pointer"
            onClick={() => navigate("/datepick")}
          >
            Room Reserver
          </li>
        </ul>
        <div className=" flex justify-center ">
          {user && (
            <>
              {user.rights == ADMIN && (
                <div>
                  <IconButton
                    colorScheme="facebook"
                    aria-label="settings"
                    icon={<FiSettings size={25} style={{ color: "#f0fdf4" }} />}
                    onClick={() => {
                      navigate(`/settings`);
                    }}
                    className="h-10 w-10 mr-2"
                    size="md"
                  />
                </div>
              )}

              <div className="flex text-white bg-violet-900 h-10 rounded-lg justify-center items-center pr-1 mr-2 lg:mr-4">
                <h2 className="text-xs font-bold mr-3 ml-2 lg:text-base ">
                  {user.email}
                </h2>
                <h3 className="text-xs lg:text-sm">{user.company}</h3>
              </div>
            </>
          )}
          <HamburgerMenu loginLogoutHandler={loginLogoutHandler} />
          {/* <Button
            colorScheme={user ? "red" : "teal"}
            size="md"
            onClick={loginLogoutHandler}
            className="mr-2 lg:mr-9"
          >
            {user ? "Logout" : "Sign In"}
          </Button> */}
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
