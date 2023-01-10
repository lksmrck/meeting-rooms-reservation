import { FC } from "react";
import { Button } from "@chakra-ui/react";

type ReservedBlockProps = {
  height: number;
  onClick: () => void;
};

const ReservedBlock: FC<ReservedBlockProps> = ({ height, onClick }) => {
  return (
    <Button
      size="sm"
      className="hover:translate-x-1 w-20 border border-stone-700 shadow-md shadow-slate-600 text-xs"
      colorScheme="telegram"
      style={{ height: `${height}rem` }}
      onClick={onClick}
    >
      Reserved
    </Button>
  );
};

export default ReservedBlock;
