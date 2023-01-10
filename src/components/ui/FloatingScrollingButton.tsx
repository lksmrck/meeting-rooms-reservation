import { useState, useEffect, FC } from "react";
import rocketFire from "../../assets/rocketWithFire.png";
import rocketNoFire from "../../assets/rocketWithoutFire.png";

const FloatingScrollButton: FC = () => {
  const [showButton, setShowButton] = useState(false);
  const [goingUp, setGoingUp] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 450) {
        setShowButton(true);
      } else {
        if (window.scrollY < 450) {
          setShowButton(false);
          setGoingUp(false);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (goingUp) {
      setTimeout(() => {
        setGoingUp(false);
      }, 1000);
    }
  }, [goingUp]);

  const scrollTop = (): void => {
    if (goingUp) return;
    setGoingUp(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {showButton && (
        <img
          src={goingUp ? rocketFire : rocketNoFire}
          alt="rocket"
          className={`fixed bottom-10 right-0 md:right-5 w-20 h-20 z-10 ${
            goingUp ? "animate-rocketBounce" : ""
          }`}
          onClick={scrollTop}
        />
      )}
    </div>
  );
};
export default FloatingScrollButton;
