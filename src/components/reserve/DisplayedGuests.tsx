import React, { Dispatch, SetStateAction } from "react";
import { IconButton } from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";

type DisplayedGuestsProps = {
  guests: string[];
  setGuestsOpenModal: Dispatch<SetStateAction<boolean>>;
  form?: boolean;
};

const DisplayedGuests: React.FC<DisplayedGuestsProps> = ({
  guests,
  setGuestsOpenModal,
  form,
}) => {
  return (
    <div>
      {form && <p className="text-sm font-bold">Guests</p>}
      <div className={`flex ${form && "my-0.5"}`}>
        <p
          className={` h-8 pl-2 cursor-pointer flex items-center text-sm bg-white w-56 border ${
            form ? "rounded-md" : "rounded-sm"
          }  break-words overflow-x-scroll whitespace-nowrap scrollbar-hide`}
        >
          {guests.length > 0 ? (
            guests.map((guest: string, i: number) => {
              return (
                <span className=" ml-1">
                  {guest}
                  {/* Za každým, kromě posledního guesta bude čárka */}
                  {i + 1 == guests.length ? "" : ","}
                </span>
              );
            })
          ) : (
            <span>No guests.</span>
          )}
        </p>
        <div className="flex items-center justify-center">
          <IconButton
            colorScheme="teal"
            aria-label="edit"
            icon={<FiEdit size={14} style={{ color: "white" }} />}
            className="ml-3 mt-0.5"
            onClick={() => {
              setGuestsOpenModal(true);
            }}
            size="xs"
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayedGuests;
