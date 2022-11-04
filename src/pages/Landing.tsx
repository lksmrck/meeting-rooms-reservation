import React from "react";
import Features from "../components/landing/Features";
import Title from "../components/landing/Title";
import Input from "../components/layout/Input";
import Auth from "../components/auth/Auth";
import Steps from "../components/landing/Steps";
import Reference from "../components/landing/Reference";

const Landing = () => {
  return (
    <div>
      <Title />
      <Features />
      <Steps />
      <Reference />
    </div>
  );
};
export default Landing;
