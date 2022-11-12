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
import { GoPlus } from "react-icons/go";
import { AiOutlineMinus } from "react-icons/ai";

const MeetingDetail = () => {
  const appContext = useContext(AppContext);
  const { openModal, setOpenModal } = appContext;

  const [inputsNumber, setInputsNumber] = useState<number[]>([1]);

  const [guests, setGuests] = useState({});

  const onAddGuests = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setGuests({ ...guests, [e.target.name]: e.target.value });
  };
  console.log(guests);

  const onCancel = () => {
    setOpenModal(false);
    setInputsNumber([1]);
    setGuests({});
  };

  const onSubmitGuests = (e: React.SyntheticEvent) => {
    setOpenModal(false);
  };

  return (
    <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Meeting detail</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <section>
            <h3>MEETING NAME</h3>
            <h4>MEETING TYPE</h4>
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
