import { FC, Dispatch, SetStateAction } from "react";
import { IconButton } from "@chakra-ui/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
type NoGuestsProps = {
  setGuestsOpenModal: Dispatch<SetStateAction<boolean>>;
};

const NoGuests: FC<NoGuestsProps> = ({ setGuestsOpenModal }) => {
  const handleAddGuestsClick = () => {
    setGuestsOpenModal(true);
  };

  return (
    <div className="w-full flex items-center justify-between mt-0.5 h-8">
      <p className="text-sm ml-1">No guests</p>
      <IconButton
        aria-label="plus"
        colorScheme="purple"
        icon={<AiOutlinePlusCircle size={18} style={{ color: "#f0fdf4" }} />}
        onClick={handleAddGuestsClick}
        className=" w-5 mr-2"
        size="xs"
      />
    </div>
  );
};

export default NoGuests;
