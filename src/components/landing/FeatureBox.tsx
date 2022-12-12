import React from "react";

type FeatureBoxProps = {
  feature: any;
  up?: boolean;
  down?: boolean;
};

const FeatureBox: React.FC<FeatureBoxProps> = ({ feature, up, down }) => {
  return (
    <li
      className={`${
        up ? "animate-floatUp" : "animate-floatDown"
      } flex flex-col justify-center items-center hover:shadow-2xl h-60 cursor-pointer hover:bg-indigo-300 w-64 lg:w-72 bg-indigo-200 rounded-lg m-3 lg:m-5`}
    >
      {feature.icon}
      <h1 className="text-3xl lg:text-4xl mt-2 font-solid">{feature.text}</h1>
    </li>
  );
};

export default FeatureBox;
