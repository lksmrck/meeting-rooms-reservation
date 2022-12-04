import { timeBlocks } from "../../common/common";
import { TimeBlock } from "../../types/types";

const TimeBlocksDom: React.FC = () => {
  const timeBlocksDom = timeBlocks.map((block: TimeBlock) => {
    return (
      <div
        key={block.id}
        className=" flex font-bold justify-center items-center text-xs w-24 h-10 border border-stone-700 rounded-md bg-gray-200 shadow-lg shadow-slate-600 "
      >
        {block.time}
      </div>
    );
  });
  return <>{timeBlocksDom}</>;
};

export default TimeBlocksDom;
