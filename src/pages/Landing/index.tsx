import React, { HTMLFactory, useRef, forwardRef, useEffect } from "react";
import Title from "./Title";
import Features from "./Features";
import Steps from "./Steps";
import Reference from "./Reference";
import ContactUs from "./ContactUs";
import { useLocation } from "react-router-dom";

const Landing = ({ gatherLandingRefs }: any) => {
  const location = useLocation();

  const landingRefs = {
    featuresRef: useRef(null),
    stepsRef: useRef(null),
    referencesRef: useRef(null),
    contactRef: useRef(null),
  };

  useEffect(() => {
    gatherLandingRefs(landingRefs);
    console.log("render landing");
    console.log(landingRefs);
  }, []);

  return (
    <div className="h-auto ">
      <Title />
      <Features ref={landingRefs.featuresRef} />
      <Steps ref={landingRefs.stepsRef} />
      <Reference ref={landingRefs.referencesRef} />
      <ContactUs ref={landingRefs.contactRef} />
    </div>
  );
};

export default Landing;
