import { FC } from "react";

type BlockWithTimeProps = {
  children: string;
};

const BlockWithTime: FC<BlockWithTimeProps> = ({ children }) => {
  return (
    <div className="flex font-bold justify-center items-center text-xs md:text-sm w-24 h-10 border border-stone-700 rounded-md bg-gray-200 shadow-lg shadow-slate-600 whitespace-nowrap overflow-hidden">
      {children}
    </div>
  );
};

export default BlockWithTime;
