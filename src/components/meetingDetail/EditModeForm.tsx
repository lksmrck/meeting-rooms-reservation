import React, { ChangeEvent, Dispatch, SetStateAction, FC } from "react";
import { Input } from "@chakra-ui/react";
import MeetingType from "../reserve/FormSelect";
import { meetingTypes } from "../../data/constants";
import DisplayedGuests from "../reserve/DisplayedGuests";
import UpdateMeetingTime from "./UpdateMeetingTime";
import GuestsModal from "../../pages/Reserve/GuestsModal";
import { RoomData } from "../../types/types";

type EditModeFormProps = {
  updatedTime: { start: string | null; end: string | null };
  setUpdatedTime: Dispatch<
    SetStateAction<{ start: string | null; end: string | null }>
  >;

  updatedGuests: string[];
  setUpdatedGuests: Dispatch<SetStateAction<string[]>>;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  meetingName: string;
  creator: string;
  isGuestModalOpen: boolean;
  setIsGuestModalOpen: Dispatch<SetStateAction<boolean>>;
  startTimeOptions: RoomData[];
  endTimeOptions: RoomData[];
  setMissingFormData: Dispatch<SetStateAction<boolean>>;
};

//Přetahuje se odtud až do MeetingDetail componentu (přes DetailDomEditMode komponent) - handlery a formData jsou až v meeting detail.

const EditModeForm: FC<EditModeFormProps> = ({
  updatedTime,
  setUpdatedTime,
  updatedGuests,
  setUpdatedGuests,
  onChange,
  meetingName,
  creator,
  isGuestModalOpen,
  setIsGuestModalOpen,
  startTimeOptions,
  endTimeOptions,
  setMissingFormData,
}) => {
  return (
    <form className="grid grid-cols-2">
      <div className="[&>*]:font-bold [&>*]:h-8 [&>*]:flex [&>*]:items-center ">
        <h3>Meeting name: </h3>
        <h4>Meeting type: </h4>
        <h5>Created by: </h5>
        <h5>Guests:</h5>
        <h5 className="mt-0.5">Start time: </h5>
        {updatedTime.start != null && <h5 className="mt-0.5">End time: </h5>}
      </div>
      <div>
        <Input
          name="name"
          value={meetingName}
          size="sm"
          onChange={onChange}
          focusBorderColor="teal.400"
        />

        <MeetingType
          id="type"
          name="type"
          options={meetingTypes}
          onChange={onChange}
          small
        />
        <Input value={creator} size="sm" disabled />
        <DisplayedGuests
          guests={updatedGuests}
          setGuestsOpenModal={setIsGuestModalOpen}
        />

        {isGuestModalOpen && (
          <GuestsModal
            isOpen={isGuestModalOpen}
            setIsOpen={setIsGuestModalOpen}
            onAddGuests={setUpdatedGuests}
            addedGuests={updatedGuests}
          />
        )}
        <div className="flex flex-col mt-0.5 ">
          <UpdateMeetingTime
            options={startTimeOptions}
            start
            setUpdatedTime={setUpdatedTime}
            updatedTime={updatedTime}
            setMissingFormData={setMissingFormData}
          />
          {updatedTime.start != null && (
            <UpdateMeetingTime
              options={endTimeOptions}
              end
              setUpdatedTime={setUpdatedTime}
              updatedTime={updatedTime}
              setMissingFormData={setMissingFormData}
            />
          )}
        </div>
      </div>
    </form>
  );
};

export default EditModeForm;
