import React, { useState, useContext } from "react";
import Input from "../layout/Input";
import Button from "../layout/MyButton";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../state/AuthContext";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  if (!authContext) return null;
  const { user, setUser } = authContext;

  const loginHandler = async (e: any) => {
    e.preventDefault();

    //Firebase docs -  https://firebase.google.com/docs/auth/web/password-auth
    //Firebase Auth
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        console.log(user.email);
        navigate("/home");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <section className="flex justify-center mt-4">
      <div className=" flex justify-center w-96 bg-green-50">
        <h1>"Login"</h1>
        <form className="w-72 p-6 [&>input]:m-1" onSubmit={loginHandler}>
          <Input
            id="email"
            name="email"
            type="e-mail"
            placeholder="Enter your e-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex justify-center ">
            <Button type="submit" text="Login" />
            <Button text="Back" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Auth;
