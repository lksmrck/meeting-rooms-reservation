import { FC } from "react";

type CircleProps = {
  top: string;
  /*  smLeft: string;
  mdLeft: string; */
  left: string;
};

/*DODELAT */
const Circle: FC<CircleProps> = ({ top, /* smLeft, mdLeft  */ left }) => {
  return (
    <div
      className={`absolute w-28 h-28 top-${top} left-${left} md:left-${left} bg-white rounded-full`}
    ></div>
  );
};

export default Circle;
