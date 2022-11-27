import React, {
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from "react";
import { Input } from "@chakra-ui/react";
import MeetingType from "../reserve/form/MeetingType";
import { meetingTypes } from "../../constants/constants";
import DisplayedGuests from "../reserve/form/DisplayedGuests";
import GuestsModal from "../reserve/form/GuestsModal";
import UpdateMeetingTime from "./UpdateMeetingTime";
import ReservationContext from "../../state/ReservationContext";
import { Meeting, RoomData } from "../../types/types";

type DetailDomEditModeProps = {
  updatedMeeting: Meeting;
  onChangeMeeting: (e: ChangeEvent<HTMLInputElement>) => void;
  updatedTime: { start: string | null; end: string | null };
  setUpdatedTime: Dispatch<
    SetStateAction<{ start: string | null; end: string | null }>
  >;
  setUpdatedGuests: Dispatch<SetStateAction<string[]>>;
  setMissingFormData: Dispatch<SetStateAction<boolean>>;
  updatedGuests: any;
};

const DetailDomEditMode: React.FC<DetailDomEditModeProps> = ({
  updatedMeeting,
  onChangeMeeting,
  updatedTime,
  setUpdatedTime,
  setUpdatedGuests,
  setMissingFormData,
  updatedGuests,
}) => {
  const { pickedRoom } = useContext(ReservationContext);

  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

  const { blocks, creator, name, guests } = updatedMeeting;

  const adjustedRoomData = pickedRoom.roomData.map((data: RoomData) => {
    if (blocks.includes(data.block)) return { ...data, reserved: false };
    return data;
  });

  //Upravená pickedRoom tak, že u blocků ,které jsou v meetingu, který jde do editu se nastaví reserved = false
  const [localPickedRoom, setLocalPickedRoom] = useState({
    ...pickedRoom,
    roomData: adjustedRoomData,
  });

  //State pro edit time => vyfiltrované bloky, které mají reserved = false {block: 1, start: 7:00, end: 7:00, reserved: false, selected: false}
  const possibleStartTime = localPickedRoom.roomData.filter(
    (data: RoomData) => {
      return data.reserved == false;
    }
  );
  const [startTimeOptions, setStartTimeOptions] = useState(possibleStartTime);

  const [endTimeOptions, setEndTimeOptions] = useState<RoomData[]>([]);
  useEffect(() => {
    //Loop, na přiřazení možného končícího času meetingu (updatuje se vždy po zadání počátečního času)
    let possibleEndTime: RoomData[] = [];
    //Loop začne od i => vybrané počáteční datum meetingu

    let i = localPickedRoom.roomData.findIndex(
      (x) => x.start == updatedTime.start
    );
    for (i; i < 24; i++) {
      if (i == 23) {
        possibleEndTime.push(localPickedRoom.roomData[i]);
        setEndTimeOptions(possibleEndTime);
      } else if (!localPickedRoom?.roomData[i]?.reserved) {
        possibleEndTime.push(localPickedRoom.roomData[i]);
      } else if (localPickedRoom?.roomData[i]?.reserved) {
        setEndTimeOptions(possibleEndTime);
        break;
      }
    }
  }, [updatedTime]);

  return (
    <form className="grid grid-cols-2">
      <div className="[&>*] font-bold">
        <h3>Meeting name: </h3>
        <h4>Meeting type: </h4>
        <h5>Created by: </h5>
        <h5>Guests:</h5>
        <h5 className="mt-0.5">Start time: </h5>
        {updatedTime.hasOwnProperty("start") && (
          <h5 className="mt-0.5">End time: </h5>
        )}
      </div>
      <div>
        <Input name="name" value={name} size="sm" onChange={onChangeMeeting} />

        <MeetingType
          id="type"
          name="type"
          options={meetingTypes}
          onChange={onChangeMeeting}
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
        <div className="flex flex-col ">
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

export default DetailDomEditMode;
