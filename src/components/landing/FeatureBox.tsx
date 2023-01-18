import { FC } from "react";
import { Feature } from "../../types/types";

type FeatureBoxProps = {
  feature: Feature;
  down?: boolean;
};

const FeatureBox: FC<FeatureBoxProps> = ({ feature }) => {
  return (
    <li
      className={`hover:animate-featuresBounce flex flex-col justify-center items-center shadow-2xl h-60 cursor-pointer  hover:bg-teal-600 w-64 lg:w-72 bg-cyan-900 rounded-lg m-3 lg:m-5 border border-teal-900`}
    >
      <div className="h-2/3 flex items-center justify-center">
        <h1 className="w-1/3 mr-4 text-3xl lg:text-4xl font-solid text-white">
          {feature.name}
        </h1>
        <img src={feature.icon} width="80px" className="w-1/2" />
      </div>

      <h1 className="text-sm md:text-base mt-2 font-solid text-center text-gray-200">
        {feature.text}
      </h1>
      <h3 className="text-sm font-solid text-center text-gray-400">
        {feature.textAuthor}
      </h3>
    </li>
  );
};

export default FeatureBox;
