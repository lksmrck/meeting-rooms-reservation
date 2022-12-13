import { FiTarget as Target } from "react-icons/fi";
import { MdOutlineSportsScore as Flag } from "react-icons/md";
import { GiClick as Point } from "react-icons/gi";
import FeatureBox from "./FeatureBox";
import { ReactNode } from "react";

const featureBoxes = [
  {
    text: "Simple",
    icon: <Target color="orange" className="h-2/5 w-2/5 lg:h-1/2 lg:w-1/2 " />,
  },
  {
    text: "Fast",
    icon: <Flag color="orange" className=" h-2/5 w-2/5 lg:h-1/2 lg:w-1/2" />,
  },
  {
    text: "Easy to learn",
    icon: <Point color="orange" className="h-2/5 w-2/5 lg:h-1/2 lg:w-1/2" />,
  },
];

const Features = () => {
  return (
    <section className="h-3/4">
      <div className="flex justify-center  bg-features items-center h-full overflow-hidden">
        <ul className="flex flex-col m-10 lg:flex-row ">
          {featureBoxes.map(
            (feature: { text: string; icon: ReactNode }, index: number) => {
              return (
                //Jen quick inline modifikace, aby se prostřední item animoval jinak, než dva krajní - není scalable.
                <FeatureBox feature={feature} up={index == 1 ? false : true} />
              );
            }
          )}
        </ul>
      </div>
    </section>
  );
};
export default Features;
