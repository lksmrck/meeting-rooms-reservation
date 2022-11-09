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

const GuestsModal = () => {
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
        <ModalHeader>Add guests</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form>
            {inputsNumber.map((input: any) => {
              return (
                <Input
                  size="sm"
                  placeholder="Please enter guests e-mail"
                  name={input}
                  id={input}
                  onChange={onAddGuests}
                />
              );
            })}

            <div className="flex justify-end">
              {inputsNumber.length > 1 ? (
                <IconButton
                  size="sm"
                  icon={<AiOutlineMinus />}
                  aria-label="minus"
                  onClick={() =>
                    setInputsNumber((prevState: number[]) =>
                      prevState.slice(0, -1)
                    )
                  }
                ></IconButton>
              ) : (
                ""
              )}

              <IconButton
                size="sm"
                icon={<GoPlus />}
                aria-label="plus"
                onClick={() => {
                  console.log(inputsNumber);
                  setInputsNumber((prevState: number[]) => [
                    ...prevState,
                    prevState.length + 1,
                  ]);
                }}
              />
            </div>
          </form>
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

export default GuestsModal;
