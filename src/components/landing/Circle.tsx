import { FC } from "react";

type CircleProps = {
  additionalTWStyles: string;
};

const Circle: FC<CircleProps> = ({ additionalTWStyles }) => {
  return (
    <div
      className={`absolute w-28 h-28  bg-white rounded-full ${additionalTWStyles}`}
    ></div>
  );
};

export default Circle;
