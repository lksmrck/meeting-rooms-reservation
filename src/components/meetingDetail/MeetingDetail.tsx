import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  Input,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import AppContext from "../../state/AppContext";

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
          <section>
            <h3>{clickedMeeting.name}</h3>
            <h4>{clickedMeeting.type}</h4>
            <h5>CREATOR</h5>
            <h5>GUESTS</h5>
            <h5>START</h5>
            <h5>ENDS</h5>
            <h5>LENGTH</h5>
          </section>
        </ModalBody>
        <ModalFooter className="[&>button]:m-1 ">
          <Button colorScheme="teal" onClick={onSubmitGuests}>
            Save
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MeetingDetail;
