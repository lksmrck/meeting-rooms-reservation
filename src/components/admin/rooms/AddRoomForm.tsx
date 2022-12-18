import { Dispatch, SetStateAction } from "react";
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
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: string;
  addRoomHandler: (e: React.SyntheticEvent) => void;
  onCancel: () => void;
};

const AddRoomForm: React.FC<AddRoomFormProps> = ({
  isOpen,
  onClose,
  isLoading,
  onChange,
  formData,
  addRoomHandler,
  onCancel,
}) => {
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
                onChange={onChange}
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

export default AddRoomForm;
