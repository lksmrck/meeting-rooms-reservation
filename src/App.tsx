import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import { useState } from "react";
import { LandingRefsObject } from "./types/types";
import FloatingScrollButton from "./components/ui/FloatingScrollingButton";
import Routes from "./routes/Routes";

const App = () => {
  //Refs for Components in Landing page
  const [landingRefs, setLandingRefs] = useState({} as LandingRefsObject);

  const gatherLandingRefs = (refs: LandingRefsObject) => {
    setLandingRefs(refs);
  };

  return (
    <div className="overflow-y-scroll scrollbar-hide w-screen flex flex-col">
      <div>
        <FloatingScrollButton />
        <Navbar />
        <Routes gatherLandingRefs={gatherLandingRefs} />
      </div>
      <Footer landingRefs={landingRefs} />
    </div>
  );
};

export default App;
