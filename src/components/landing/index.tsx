import React from "react";
import Title from "./Title";
import Features from "./Features/Features";
import Steps from "./Steps";
import Reference from "./Reference";
import ContactUs from "./ContactUs";

const LandingPage = () => {
  return (
    <div className="h-auto ">
      <Title />
      <Features />
      <Steps />
      <Reference />
      <ContactUs />
    </div>
  );
};

export default LandingPage;
