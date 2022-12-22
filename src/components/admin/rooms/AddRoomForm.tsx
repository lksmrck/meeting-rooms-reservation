import { Dispatch, SetStateAction, useState } from "react";
import LoadingSpinner from "../../ui/LoadingSpinner/LoadingSpinner";

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

type AddRoomFormProps = {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  addRoomHandler: (formData: string) => void;
  onCancel: () => void;
};

const AddRoomForm: React.FC<AddRoomFormProps> = ({
  isOpen,
  onClose,
  isLoading,
  addRoomHandler,
  onCancel,
}) => {
  const [formData, setFormData] = useState("");

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData(e.target.value);
  };

  const formSubmitHandler = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    addRoomHandler(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => onClose(false)}>
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
          <Button colorScheme="teal" onClick={formSubmitHandler}>
            Submit
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddRoomForm;
