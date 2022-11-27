import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../state/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { Button } from "@chakra-ui/react";

const Navbar = () => {
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  const { user, setUser, company } = authContext;

  const onClickButton = () => {
    if (user) {
      setUser(null);
      localStorage.clear();
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
          <li className=" lg:ml-5 ml-2 text-white">Room Reserver</li>
        </ul>
        <div className=" flex justify-center ">
          {user && company && (
            <div className="flex text-white bg-violet-900 rounded-lg justify-center items-center pr-1 mr-2 lg:mr-4">
              <h2 className="text-xs font-bold mr-3 ml-2 lg:text-base ">
                {user.email}
              </h2>
              <h3 className="text-xs lg:text-sm">{company}</h3>
            </div>
          )}
          <Button
            colorScheme="teal"
            size="md"
            onClick={onClickButton}
            className="mr-2 lg:mr-9"
          >
            {user ? "Logout" : "Sign In"}
          </Button>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
