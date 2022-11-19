import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  Button,
} from "@chakra-ui/react";
import { useState, useContext, Dispatch, SetStateAction } from "react";
import { timeDataCalc } from "./timeDataCalc";
import AuthContext from "../../state/AuthContext";
import ReservationContext from "../../state/ReservationContext";
import { useRemoveMeeting } from "../reserve/use-removeMeeting";
import { useNavigate } from "react-router-dom";
import { Meeting } from "../../types/types";
import LoadingSpinner from "../ui/LoadingSpinner/LoadingSpinner";

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

  const authContext = useContext(AuthContext);
  const reservationContext = useContext(ReservationContext);

  const { company, user } = authContext;
  const { pickedDate, pickedRoom } = reservationContext;

  const { removeData, isLoading } = useRemoveMeeting();

  const navigate = useNavigate();

  const onCancel = () => {
    setOpenDetail(false);
  };

  const deleteMeetingHandler = (e: React.SyntheticEvent) => {
    removeData("secondCompany", clickedMeeting, pickedRoom.id);
    setOpenDetail(false);
    navigate("/overview");
  };

  const editMeetingHandler = () => {
    setOpenDetail(false);
  };

  return (
    <Modal isOpen={openDetail} onClose={() => setOpenDetail(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Meeting detail</ModalHeader>
        <ModalCloseButton />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <ModalBody pb={6}>
            <section className="grid grid-cols-2">
              <div className="[&>*] font-bold">
                <h3>Meeting name: </h3>
                <h4>Meeting type: </h4>
                <h5>Created by: </h5>
                <h5>Guests:</h5>
                <h5>Start time: </h5>
                <h5>End time: </h5>
                <h5>Hours duration: </h5>
              </div>
              <div>
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
                <h3>{timeDetail.start}</h3>
                <h3>{timeDetail.end}</h3>
                <h3>{timeDetail.meetingLength} </h3>
              </div>
            </section>
          </ModalBody>
        )}

        <ModalFooter className="[&>button]:m-1 ">
          <Button colorScheme="red" onClick={deleteMeetingHandler}>
            Delete
          </Button>
          {/* Edit button se zobrazí pouze, pokud user = tvůrce meetingu */}
          {clickedMeeting.creator == user.email && (
            <Button colorScheme="orange" onClick={editMeetingHandler}>
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
