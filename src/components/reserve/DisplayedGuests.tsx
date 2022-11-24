import React from "react";
import { IconButton } from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";

type DisplayedGuestsProps = {
  guests: any;
  setGuestsOpenModal: any;
};

const DisplayedGuests: React.FC<DisplayedGuestsProps> = ({
  guests,
  setGuestsOpenModal,
}) => {
  return (
    <div>
      <p className="text-sm font-bold">Guests</p>
      <div className="flex">
        <p className="  flex items-end text-sm bg-white w-56 border rounded-md h-7 break-words overflow-x-scroll whitespace-nowrap scrollbar-hide">
          {guests.map((guest: string, i: number) => {
            return (
              <span className=" ml-1">
                {guest}
                {/* Za každým, kromě posledního guesta bude čárka */}
                {i + 1 == guests.length ? "" : ","}
              </span>
            );
          })}
        </p>
        <IconButton
          colorScheme="teal"
          aria-label="edit"
          icon={<FiEdit size={14} style={{ color: "white" }} />}
          /* onClick={() => setShowCalendar(true)} */
          className="ml-3 mt-0.5"
          onClick={() => {
            setGuestsOpenModal(true);
          }}
          size="xs"
        />
      </div>
    </div>
  );
};

export default DisplayedGuests;
