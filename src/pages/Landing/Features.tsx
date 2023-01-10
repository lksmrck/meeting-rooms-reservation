import { FiTarget as Target } from "react-icons/fi";
import { MdOutlineSportsScore as Flag } from "react-icons/md";
import { GiClick as Point } from "react-icons/gi";
import FeatureBox from "../../components/landing/FeatureBox";
import { Feature } from "../../types/types";
import { forwardRef } from "react";

const featureBoxes = [
  {
    text: "Simple",
    icon: <Target color="white" className="h-2/5 w-2/5 lg:h-1/2 lg:w-1/2 " />,
  },
  {
    text: "Fast",
    icon: <Flag color="white" className=" h-2/5 w-2/5 lg:h-1/2 lg:w-1/2" />,
  },
  {
    text: "Easy to use",
    icon: <Point color="white" className="h-2/5 w-2/5 lg:h-1/2 lg:w-1/2" />,
  },
];

const Features = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div className="h-3/4" ref={ref}>
      <div className="flex justify-center  bg-features items-center h-full overflow-hidden">
        <ul className="flex flex-col m-10 lg:flex-row ">
          {featureBoxes.map((feature: Feature, index: number) => {
            return (
              //Jen quick inline modifikace, aby se prostřední item animoval jinak, než dva krajní - není scalable.
              <FeatureBox
                key={feature.text}
                feature={feature}
                up={index == 1 ? false : true}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
});
export default Features;
