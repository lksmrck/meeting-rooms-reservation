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
import { useState } from "react";

import { timeDataCalc } from "./timeDataCalc";

type MeetingDetailProps = {
  clickedMeeting: any;
  openDetail: boolean;
  setOpenDetail: React.Dispatch<React.SetStateAction<boolean>>;
};

const MeetingDetail: React.FC<MeetingDetailProps> = ({
  clickedMeeting,
  openDetail,
  setOpenDetail,
}) => {
  const [timeDetail, setTimeDetail] = useState(timeDataCalc(clickedMeeting));

  const onCancel = () => {
    setOpenDetail(false);
  };

  const onSubmitGuests = (e: React.SyntheticEvent) => {
    setOpenDetail(false);
  };

  return (
    <Modal isOpen={openDetail} onClose={() => setOpenDetail(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Meeting detail</ModalHeader>
        <ModalCloseButton />
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
              <h4>{clickedMeeting.type}</h4>
              <h5>{clickedMeeting.creator}</h5>
              <h5>
                {clickedMeeting.guests.length > 0
                  ? clickedMeeting.guests.length > 1
                    ? `Meeting has ${clickedMeeting.guests.length} guests`
                    : `Meeting has ${clickedMeeting.guests.length} guest`
                  : "No guests"}
              </h5>
              <h5>{timeDetail.start}</h5>
              <h5>{timeDetail.end}</h5>
              <h5>{timeDetail.meetingLength} </h5>
            </div>
          </section>
        </ModalBody>
        <ModalFooter className="[&>button]:m-1 ">
          <Button colorScheme="teal" onClick={onSubmitGuests}>
            Edit
          </Button>
          <Button onClick={onCancel}>Back</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MeetingDetail;
