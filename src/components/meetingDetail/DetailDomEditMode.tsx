import React, { useState, useEffect, useContext } from "react";
import { Input } from "@chakra-ui/react";
import MeetingType from "../reserve/form/MeetingType";
import { meetingTypes } from "../../constants/constants";
import DisplayedGuests from "../reserve/form/DisplayedGuests";
import GuestsModal from "../reserve/form/GuestsModal";
import UpdateMeetingTime from "./UpdateMeetingTime";
import ReservationContext from "../../state/ReservationContext";

type DetailDomEditModeProps = {
  updatedMeeting: any;
  onChangeMeeting: any;
};

const DetailDomEditMode: React.FC<DetailDomEditModeProps> = ({
  updatedMeeting,
  onChangeMeeting,
}) => {
  const { pickedRoom } = useContext(ReservationContext);

  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

  const [updatedTime, setUpdatedTime] = useState({ start: "", end: "" });
  const [updatedGuests, setUpdatedGuests] = useState([] as string[]);

  const { blocks } = updatedMeeting;

  const adjustedRoomData = pickedRoom.roomData.map((data: any) => {
    if (blocks.includes(data.block)) return { ...data, reserved: false };
    return data;
  });

  //Upravená pickedRoom tak, že u blocků ,které jsou v meetingu, který jde do editu se nastaví reserved = false
  const [localPickedRoom, setLocalPickedRoom] = useState({
    ...pickedRoom,
    roomData: adjustedRoomData,
  });

  //State pro edit time => vyfiltrované bloky, které mají reserved = false {block: 1, start: 7:00, end: 7:00, reserved: false, selected: false}
  const possibleStartTime = localPickedRoom.roomData.filter((data: any) => {
    return data.reserved == false;
  });
  const [startTimeOptions, setStartTimeOptions] = useState(possibleStartTime);

  const [endTimeOptions, setEndTimeOptions] = useState<any>([]);
  useEffect(() => {
    let possibleEndTime: any = [];
    //Loop začne od i => vybrané počáteční datum meetingu
    let i = localPickedRoom.roomData.findIndex(
      (x) => x.start == updatedTime.start
    );
    //Loop, na přiřazení možného končícího času meetingu (updatuje se vždy po zadání počátečního času)
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
        <h5 className="mt-0.5">End time: </h5>
      </div>
      <div>
        <Input
          name="name"
          value={updatedMeeting.name}
          size="sm"
          onChange={onChangeMeeting}
          className=""
        />

        <MeetingType
          id="type"
          name="type"
          options={meetingTypes}
          onChange={onChangeMeeting}
          small
        />

        <Input value={updatedMeeting.creator} size="sm" disabled />
        <DisplayedGuests
          guests={updatedMeeting.guests}
          setGuestsOpenModal={setIsGuestModalOpen}
        />

        {isGuestModalOpen && (
          <GuestsModal
            isOpen={isGuestModalOpen}
            setIsOpen={setIsGuestModalOpen}
            onAddGuests={setUpdatedGuests}
          />
        )}
        <div className="flex flex-col border">
          <UpdateMeetingTime
            options={startTimeOptions}
            start
            setUpdatedTime={setUpdatedTime}
            updatedTime={updatedTime}
          />
          {endTimeOptions && endTimeOptions?.length > 0 ? (
            <UpdateMeetingTime
              options={endTimeOptions}
              end
              setUpdatedTime={setUpdatedTime}
              updatedTime={updatedTime}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </form>
  );
};

export default DetailDomEditMode;
