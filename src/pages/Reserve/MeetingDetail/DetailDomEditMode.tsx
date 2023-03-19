import {
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  FC,
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

const DetailDomEditMode: FC<DetailDomEditModeProps> = ({
  updatedMeeting,
  onChangeMeeting,
  updatedTime,
  setUpdatedTime,
  setUpdatedGuests,
  setMissingFormData,
  updatedGuests,
}) => {
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const { blocks, creator, name } = updatedMeeting;

  const { pickedRoom } = useContext(ReservationContext);

  const adjustedRoomData = pickedRoom.roomData.map((data: RoomData) => {
    if (blocks.includes(data.block)) return { ...data, reserved: false };
    return data;
  });

  const localPickedRoom = { ...pickedRoom, roomData: adjustedRoomData };

  const possibleStartTime = localPickedRoom.roomData.filter(
    (data: RoomData) => {
      return data.reserved === false;
    }
  );

  const [endTimeOptions, setEndTimeOptions] = useState<RoomData[]>([]);
  useEffect(() => {
    let possibleEndTime: RoomData[] = [];

    let i = localPickedRoom.roomData.findIndex(
      (block) => block.start === updatedTime.start
    );
    for (i; i < 24; i++) {
      if (i === 23) {
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
      startTimeOptions={possibleStartTime}
      endTimeOptions={endTimeOptions}
      setMissingFormData={setMissingFormData}
    />
  );
};

export default DetailDomEditMode;
