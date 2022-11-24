import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  Button,
  Input,
} from "@chakra-ui/react";
import {
  useState,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { timeDataCalc } from "./timeDataCalc";
import AuthContext from "../../state/AuthContext";
import ReservationContext from "../../state/ReservationContext";
import { useRemoveMeeting } from "../../hooks/use-removeMeeting";
import { useNavigate } from "react-router-dom";
import { Meeting } from "../../types/types";
import LoadingSpinner from "../ui/LoadingSpinner/LoadingSpinner";
import UpdateMeetingTime from "./UpdateMeetingTime";
import MeetingType from "../reserve/MeetingType";
import { meetingTypes } from "../../constants/constants";

type MeetingDetailProps = {
  clickedMeeting: Meeting;
  openDetail: boolean;
  setOpenDetail: Dispatch<SetStateAction<boolean>>;
};

const MeetingDetail: React.FC<MeetingDetailProps> = ({
  clickedMeeting,
  openDetail,
  setOpenDetail,
}) => {
  const [timeDetail, setTimeDetail] = useState(timeDataCalc(clickedMeeting));

  //Editing state
  const [isEditing, setIsEditing] = useState(false);
  const [updatedMeeting, setUpdatedMeeting] = useState(clickedMeeting);
  const [updatedTime, setUpdatedTime] = useState({ start: "", end: "" });

  //State na local loading - aby nebyl problém se synchronizací s Firebase (update a nasledny fetch updated)
  const [fbIsLoading, setFbIsLoading] = useState(false);

  const { company, user } = useContext(AuthContext);
  const { pickedDate, pickedRoom } = useContext(ReservationContext);

  const { blocks } = clickedMeeting;

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
        console.log("break");

        break;
      } /* else return; */
    }
  }, [updatedTime]);

  const { removeData, isLoading } = useRemoveMeeting();

  const navigate = useNavigate();

  const onCancel = () => {
    setOpenDetail(false);
    setIsEditing(false);
  };

  const deleteMeetingHandler = (e: React.SyntheticEvent) => {
    setFbIsLoading(true);
    removeData("secondCompany", clickedMeeting, pickedRoom.id);
    //Timeout aby nebyl problém se synchronizací s Firebase (update a nasledny fetch updated) - byly problémy s načítáním dat po odstranění mtg.
    setTimeout(() => {
      navigate("/overview");
      setFbIsLoading(false);
      setOpenDetail(false);
    }, 750);
  };

  const editModeToggler = () => {
    setIsEditing(true);
  };

  const onChangeMeeting = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedMeeting({ ...updatedMeeting, [e.target.name]: e.target.value });
    console.log(updatedMeeting);
  };

  return (
    <Modal isOpen={openDetail} onClose={() => setOpenDetail(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Meeting detail</ModalHeader>
        <ModalCloseButton />
        {fbIsLoading || isLoading ? (
          <LoadingSpinner />
        ) : (
          <ModalBody pb={6}>
            <section className="grid grid-cols-2">
              <div className="[&>*] font-bold">
                <h3>Meeting name: </h3>
                <h4>Meeting type: </h4>
                <h5>Created by: </h5>
                <h5>Guests:</h5>
                <h5 className="mt-0.5">Start time: </h5>
                <h5 className="mt-0.5">End time: </h5>
                {!isEditing && <h5 className="mt-0.5">Hours duration: </h5>}
              </div>
              <div>
                {!isEditing ? (
                  <>
                    <h3>{clickedMeeting.name}</h3>
                    <h3>{clickedMeeting.type}</h3>
                    <h3>{clickedMeeting.creator}</h3>
                    <h3>
                      {clickedMeeting.guests.length > 0
                        ? clickedMeeting.guests.length > 1
                          ? `Meeting has ${clickedMeeting.guests.length} guests`
                          : `Meeting has ${clickedMeeting.guests.length} guest`
                        : "No guests"}
                    </h3>
                    <h3 className="mt-0.5">{timeDetail.start}</h3>
                    <h3 className="mt-0.5">{timeDetail.end}</h3>
                  </>
                ) : (
                  <>
                    <Input
                      name="name"
                      value={updatedMeeting.name}
                      size="sm"
                      onChange={onChangeMeeting}
                      className=""
                    />
                    {/* DÁT SELECT */}
                    {/*  <Input
                      name="type"
                      value={updatedMeeting.type}
                      size="xs"
                      onChange={onChangeMeeting}
                    /> */}

                    <MeetingType
                      id="type"
                      name="type"
                      options={meetingTypes}
                      onChange={onChangeMeeting}
                      small
                    />

                    <Input value={updatedMeeting.creator} size="sm" disabled />
                    <Input
                      name="guests"
                      value={updatedMeeting.guests}
                      size="sm"
                      onChange={onChangeMeeting}
                    />
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
                  </>
                )}

                {!isEditing && (
                  <h3 className="mt-0.5">{timeDetail.meetingLength}</h3>
                )}
              </div>
            </section>
          </ModalBody>
        )}

        <ModalFooter className="[&>button]:m-1 ">
          <Button colorScheme="red" onClick={deleteMeetingHandler}>
            Delete
          </Button>
          {/* Edit button se zobrazí pouze, pokud user = tvůrce meetingu */}
          {clickedMeeting.creator == user!.email && (
            <Button colorScheme="orange" onClick={editModeToggler}>
              Edit
            </Button>
          )}
          <Button onClick={onCancel}>Back</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MeetingDetail;
