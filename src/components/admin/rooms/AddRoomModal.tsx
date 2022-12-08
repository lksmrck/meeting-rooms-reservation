import React, { useState, useContext, Dispatch, SetStateAction } from "react";
import { useRoomsAdminFncs } from "../../../hooks/useRoomsAdminFncs";
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
} from "@chakra-ui/react";
import LoadingSpinner from "../../ui/LoadingSpinner/LoadingSpinner";

type AddRoomModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setRooms: Dispatch<SetStateAction<any>>;
  rooms: any;
};

const AddRoomModal: React.FC<AddRoomModalProps> = ({
  isOpen,
  setIsOpen,
  setRooms,
  rooms,
}) => {
  const [formData, setFormData] = useState("");

  const { addRoom, roomsFetch, isLoading } = useRoomsAdminFncs();

  const addRoomHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    addRoom(rooms, formData)
      .then(() => roomsFetch(setRooms))
      .then(() => setIsOpen(false));
  };

  const onCancel = () => {
    setIsOpen(false);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(e.target.value);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add room</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <form>
              <Input
                size="sm"
                type="text"
                placeholder="e.g. Example Room "
                name="name"
                id="name"
                onChange={inputChangeHandler}
                value={formData}
                focusBorderColor="teal.400"
                required
              />
            </form>
          )}
        </ModalBody>
        <ModalFooter className="[&>button]:m-1 ">
          <Button colorScheme="teal" onClick={addRoomHandler}>
            Submit
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddRoomModal;
