import { useRef, FC, useEffect, lazy, Suspense } from "react";

import { LandingRefsObject } from "../../types/types";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";

type LandingProps = {
  gatherLandingRefs: (refs: LandingRefsObject) => void;
};

const Landing: FC<LandingProps> = ({ gatherLandingRefs }) => {
  const Title = lazy(() => import("./Title"));
  const Features = lazy(() => import("./Features"));
  const Steps = lazy(() => import("./Steps"));
  const Reference = lazy(() => import("./Reference"));
  const Companies = lazy(() => import("./Companies"));
  const ContactUs = lazy(() => import("./ContactUs"));

  const landingRefs = {
    featuresRef: useRef<HTMLDivElement>(null),
    stepsRef: useRef<HTMLDivElement>(null),
    referencesRef: useRef<HTMLDivElement>(null),
    contactRef: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    gatherLandingRefs(landingRefs);
  }, []);

  return (
    <div className="h-auto w-full overflow-x-hidden  ">
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center bg-titleWaves bg-cover  bg-center">
            <LoadingSpinner />
          </div>
        }
      >
        <Title contactRef={landingRefs.contactRef} />
        <Features ref={landingRefs.featuresRef} />
        <Steps ref={landingRefs.stepsRef} />
        <Reference ref={landingRefs.referencesRef} />
        <Companies />
        <ContactUs ref={landingRefs.contactRef} />
      </Suspense>
    </div>
  );
};

export default Landing;
