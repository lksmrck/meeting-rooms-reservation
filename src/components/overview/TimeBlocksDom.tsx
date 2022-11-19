import { timeBlocks } from "../../common/dummyData";

const TimeBlocksDom: React.FC = () => {
  const timeBlocksDom = timeBlocks.map((block: any) => {
    return (
      <div
        key={block.id}
        className=" flex justify-center items-center text-xs w-20 h-10 border border-stone-700 rounded-md bg-gray-200 shadow-lg shadow-slate-600 "
      >
        {block.time}
      </div>
    );
  });
  return <>{timeBlocksDom}</>;
};

export default TimeBlocksDom;
