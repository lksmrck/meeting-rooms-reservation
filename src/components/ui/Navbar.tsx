import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { Button, IconButton } from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import AppContext from "../../state/AppContext";
import { ADMIN } from "../../common/constants";
import HamburgerMenu from "./HamburgerMenu";
import { useMediaQuery } from "@chakra-ui/react";
import BlobLogo from "./BlobLogo";

const Navbar = () => {
  const navigate = useNavigate();

  const [smallScreen] = useMediaQuery("(max-width: 640px)");
  const [displayBlob, setDisplayBlob] = useState(false);

  const { user, setUser } = useAuth();
  const { setError, setCalendarOpen } = useContext(AppContext);

  useEffect(() => {
    setTimeout(() => {
      setDisplayBlob(true);
    }, 1200);
  }, []);

  const loginLogoutHandler = () => {
    if (user) {
      setUser(null);
      localStorage.clear();
      signOut(auth)
        .then(() => {
          navigate("/home");
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
            className=" lg:ml-5 mr-2 ml-3 text-white cursor-pointer font-solid text-lg md:text-2xl animate-bounceInRight"
            onClick={() => {
              setCalendarOpen(false);
              navigate("/datepick");
            }}
          >
            Room Reserver
          </li>
          {displayBlob && <BlobLogo />}
        </ul>
        <div className=" flex justify-center ">
          {user && (
            <>
              {user.rights == ADMIN && !smallScreen && (
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

              <div className="flex text-white bg-violet-900 h-10 rounded-lg justify-center items-center pr-1 mr-2 md:mr-4">
                <h2 className="text-xs font-bold mr-3 ml-2 lg:text-base ">
                  {user.email}
                </h2>
                <h3 className="text-xs lg:text-sm">{user.company}</h3>
              </div>
            </>
          )}
          <div className="mr-7 lg:mr-9">
            {smallScreen ? (
              <HamburgerMenu loginLogoutHandler={loginLogoutHandler} />
            ) : (
              <Button
                colorScheme={user ? "red" : "teal"}
                size="md"
                onClick={loginLogoutHandler}
              >
                {user ? "Logout" : "Sign In"}
              </Button>
            )}
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
