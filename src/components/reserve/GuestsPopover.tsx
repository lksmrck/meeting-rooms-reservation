import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, FC } from "react";

type GuestsPopoverProps = {
  guests: string[];
  setGuestsOpenModal: Dispatch<SetStateAction<boolean>>;
  sm?: boolean;
  triggerButtonStyling?: string;
};

const GuestsPopover: FC<GuestsPopoverProps> = ({
  guests,
  setGuestsOpenModal,
  sm,
  triggerButtonStyling,
}) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const onClickEditGuests = () => {
    onClose();
    setGuestsOpenModal(true);
  };

  return (
    <Popover
      placement="right"
      onOpen={onOpen}
      isOpen={isOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        <Button
          size={sm ? "sm" : "md"}
          colorScheme="purple"
          className={`${triggerButtonStyling}`}
        >
          See guests
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader className="font-bold">Meeting guests</PopoverHeader>
        <PopoverBody>
          <ul className="overflow-scroll scrollbar-hide">
            {guests.map((guest: string) => {
              return <li className="border-b whitespace-nowrap">{guest}</li>;
            })}
          </ul>
          <div className="flex mt-1 justify-end">
            <Button
              size="sm"
              colorScheme="orange"
              onClick={onClickEditGuests}
              className="mr-1"
            >
              Edit
            </Button>
            <Button size="sm" colorScheme="red" onClick={onClose}>
              Close
            </Button>
          </div>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default GuestsPopover;
