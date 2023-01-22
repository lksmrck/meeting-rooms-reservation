import { useRef, FC, useEffect } from "react";
import Title from "./Title";
import Features from "./Features";
import Steps from "./Steps";
import Reference from "./Reference";
import ContactUs from "./ContactUs";
import Companies from "./Companies";
import { LandingRefsObject } from "../../types/types";

type LandingProps = {
  gatherLandingRefs: (refs: LandingRefsObject) => void;
};

const Landing: FC<LandingProps> = ({ gatherLandingRefs }) => {
  const landingRefs = {
    featuresRef: useRef<HTMLDivElement>(null),
    stepsRef: useRef<HTMLDivElement>(null),
    referencesRef: useRef<HTMLDivElement>(null),
    contactRef: useRef<HTMLDivElement>(null),
  };

  //Pošle refs na jednotlivé oddíly do state v App kvůli scrollu po kliknutí na footer
  useEffect(() => {
    gatherLandingRefs(landingRefs);
  }, []);

  return (
    <div className="h-auto w-full overflow-x-hidden  ">
      <Title contactRef={landingRefs.contactRef} />
      <Features ref={landingRefs.featuresRef} />
      <Steps ref={landingRefs.stepsRef} />
      <Reference ref={landingRefs.referencesRef} />
      <Companies />
      <ContactUs ref={landingRefs.contactRef} />
    </div>
  );
};

export default Landing;
