import React, {
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from "react";
import EditModeForm from "../../../components/meetingDetail/EditModeForm";
import { Meeting, RoomData } from "../../../types/types";
import ReservationContext from "../../../state/ReservationContext";

type DetailDomEditModeProps = {
  updatedMeeting: Meeting;
  onChangeMeeting: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  updatedTime: { start: string | null; end: string | null };
  setUpdatedTime: Dispatch<
    SetStateAction<{ start: string | null; end: string | null }>
  >;
  setUpdatedGuests: Dispatch<SetStateAction<string[]>>;
  setMissingFormData: Dispatch<SetStateAction<boolean>>;
  updatedGuests: string[];
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
    <EditModeForm
      updatedTime={updatedTime}
      setUpdatedTime={setUpdatedTime}
      updatedGuests={updatedGuests}
      setUpdatedGuests={setUpdatedGuests}
      onChange={onChangeMeeting}
      meetingName={name}
      creator={creator}
      isGuestModalOpen={isGuestModalOpen}
      setIsGuestModalOpen={setIsGuestModalOpen}
      startTimeOptions={startTimeOptions}
      endTimeOptions={endTimeOptions}
      setMissingFormData={setMissingFormData}
    />
  );
};

export default DetailDomEditMode;
