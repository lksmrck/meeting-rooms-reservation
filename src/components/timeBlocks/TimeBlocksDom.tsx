import { timeBlocks } from "../../data/data";
import { TimeBlock } from "../../types/types";
import BlockWithTime from "./BlockWithTime";

const TimeBlocksDom: React.FC = () => {
  const timeBlocksDom = timeBlocks.map((block: TimeBlock) => {
    return <BlockWithTime key={block.id}>{block.time}</BlockWithTime>;
  });
  return <>{timeBlocksDom}</>;
};

export default TimeBlocksDom;
