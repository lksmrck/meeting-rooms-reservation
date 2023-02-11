import React from "react";
import { Button } from "@chakra-ui/react";

type FreeBlockProps = {
  onClick: () => void;
};

const FreeBlock: React.FC<FreeBlockProps> = ({ onClick }) => {
  return (
    <Button
      size="sm"
      className=" hover:scale-105 w-20 border h-10 border-stone-700 shadow-md shadow-slate-600 "
      colorScheme="gray"
      style={{ height: `2.5rem` }}
      onClick={onClick}
    >
      Free
    </Button>
  );
};

export default FreeBlock;
