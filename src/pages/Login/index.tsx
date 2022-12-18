import React, { useState } from "react";
import {
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import { fetchUserData } from "../../utils/fetchUserData";
import { UserTypeInLS } from "../../types/types";
import LoginForm from "../../components/login/LoginForm";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  //Odkud se user prokliknul
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
    let userData: UserTypeInLS | undefined = {} as UserTypeInLS | undefined;
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            userData = await fetchUserData(userCredential.user);
          })
          .then(() => {
            if (!userData) return;
            setUser(userData);
            navigate(from, { replace: true });
            setIsLoading(false);
          });
      })

      .catch((error) => {
        setIsLoading(false);
        setLoginError({ error: true, message: error.message });
      });
  };

  return (
    <div>
      <section className="flex justify-center items-center bg-center bg-cover bg-no-repeat bg-loginBg h-content ">
        <div className=" flex flex-col justify-center mb-10 items-center w-80 h-80 md:w-96 md:h-96 bg-white  rounded-lg relative shadow-lg overflow-scroll scrollbar-hide">
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
            <LoginForm
              onSubmit={loginHandler}
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              loginError={loginError}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default Auth;
