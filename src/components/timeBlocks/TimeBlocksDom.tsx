import { timeBlocks } from "../../data/data";
import { TimeBlock } from "../../types/types";
import BlockWithTime from "./BlockWithTime";
import { FC } from "react";

const TimeBlocksDom: FC = () => {
  const timeBlocksDom = timeBlocks.map((block: TimeBlock) => {
    return <BlockWithTime key={block.id}>{block.time}</BlockWithTime>;
  });
  return <>{timeBlocksDom}</>;
};

export default TimeBlocksDom;
