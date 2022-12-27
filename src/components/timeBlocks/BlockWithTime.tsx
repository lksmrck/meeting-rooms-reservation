import { FC } from "react";

type BlockWithTimeProps = {
  key: string | number;
  children: string;
};

const BlockWithTime: FC<BlockWithTimeProps> = ({ key, children }) => {
  return (
    <div
      key={key}
      className="flex font-bold justify-center items-center text-sm w-24 h-10 border border-stone-700 rounded-md bg-gray-200 shadow-lg shadow-slate-600 "
    >
      {children}
    </div>
  );
};

export default BlockWithTime;
