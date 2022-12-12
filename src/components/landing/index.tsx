import React from "react";
import Title from "./Title";
import Features from "./Features";
import Steps from "./Steps";
import Reference from "./Reference";

const LandingPage = () => {
  return (
    <div className="h-auto ">
      <Title />
      <Features />
      <Steps />
      <Reference />
    </div>
  );
};

export default LandingPage;
