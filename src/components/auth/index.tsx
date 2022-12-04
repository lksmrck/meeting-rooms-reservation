import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import {
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "@chakra-ui/react";
import LoadingSpinner from "../ui/LoadingSpinner/LoadingSpinner";
import useAuth from "../../hooks/useAuth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/datepick";

  const [loginError, setLoginError] = useState({
    error: false,
    message: "",
  });

  const { user, setUser } = useAuth();

  const loginHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    //Firebase docs -  https://firebase.google.com/docs/auth/web/password-auth
    //Firebase Auth
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            const user = userCredential.user;
            setUser(user);
            navigate(from, { replace: true });
            setIsLoading(false);
          }
        );
      })

      .catch((error) => {
        setIsLoading(false);
        setLoginError({ error: true, message: error.message });
        /*  const errorCode = error.code; */
      });
  };

  return (
    <div>
      <section className="flex justify-center items-center bg-gradient-to-r from-violet-300 to-violet-400 h-screen ">
        <div className=" flex flex-col justify-center mb-24 items-center w-96 bg-white h-96 rounded-lg relative shadow-lg overflow-scroll scrollbar-hide">
          <div
            style={{ borderRadius: "8px 8px 50% 50%" }}
            className="h-20 w-full bg-teal-600 absolute top-0 flex flex-col items-center justify-center"
          >
            <h1 className="text-2xl font-bold text-gray-50">Login</h1>
            <h3 className=" text-sm text-gray-50">Enter your credentials</h3>
          </div>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <form
              className="w-80 mt-12  [&>input]:mt-2 "
              onSubmit={loginHandler}
            >
              <Input
                id="email"
                name="email"
                type="e-mail"
                placeholder="Enter your e-mail"
                onChange={(e) => setEmail(e.target.value)}
                focusBorderColor="teal.400"
              />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                focusBorderColor="teal.400"
              />

              <div className="flex justify-center flex-col [&>button]:mt-1 mt-8">
                <Button colorScheme="teal" type="submit">
                  Submit
                </Button>
                <Button colorScheme="teal" variant="outline">
                  Back
                </Button>
              </div>
              <p className=" text-red-600 text-sm h-1">
                {loginError.error && loginError.message}
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default Auth;
