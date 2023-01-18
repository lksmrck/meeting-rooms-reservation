import FeatureBox from "../../components/landing/FeatureBox";
import { Feature } from "../../types/types";
import { forwardRef } from "react";
import { featureBoxes } from "../../data/data";

const Features = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div className="h-3/4 bg-features pb-28 md:pb-20  " ref={ref}>
      <div className="flex justify-center   items-center h-full overflow-hidden">
        <ul className="flex flex-col m-10 lg:flex-row ">
          {featureBoxes.map((feature: Feature, index: number) => {
            return <FeatureBox key={feature.text} feature={feature} />;
          })}
        </ul>
      </div>
    </div>
  );
});
export default Features;
