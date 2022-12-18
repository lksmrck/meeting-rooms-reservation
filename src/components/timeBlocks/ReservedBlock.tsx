import React from "react";
import { Button } from "@chakra-ui/react";

type ReservedBlockProps = {
  key: string | number;
  height: number;
  onClick: () => void;
};

const ReservedBlock: React.FC<ReservedBlockProps> = ({
  key,
  height,
  onClick,
}) => {
  return (
    <Button
      key={key}
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
