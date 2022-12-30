import { useState, FC, ChangeEvent, SyntheticEvent } from "react";

import {
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";

type AddRoomFormProps = {
  isLoading: boolean;
  addRoomHandler: (formData: string) => void;
  onCancel: () => void;
};

const AddRoomForm: FC<AddRoomFormProps> = ({
  isLoading,
  addRoomHandler,
  onCancel,
}) => {
  const [formData, setFormData] = useState("");

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData(e.target.value);
  };

  const formSubmitHandler = (e: SyntheticEvent): void => {
    e.preventDefault();
    addRoomHandler(formData);
  };

  return (
    <>
      <ModalHeader>Add room</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <form>
          <Text fontSize="sm">Room name:</Text>
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
      </ModalBody>
      <ModalFooter className="[&>button]:m-1 ">
        <Button
          colorScheme="teal"
          onClick={formSubmitHandler}
          isLoading={isLoading}
          loadingText={"Creating room"}
        >
          Submit
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </ModalFooter>
    </>
  );
};

export default AddRoomForm;
