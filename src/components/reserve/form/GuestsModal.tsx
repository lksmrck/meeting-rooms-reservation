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
import React, { useState } from "react";

import { GoPlus } from "react-icons/go";
import { AiOutlineMinus } from "react-icons/ai";

type GuestsModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAddGuests: (guests: string[]) => void;
};

const GuestsModal: React.FC<GuestsModalProps> = ({
  isOpen,
  setIsOpen,
  onAddGuests,
}) => {
  const [inputsNumber, setInputsNumber] = useState<number[]>([1]);

  const [guests, setGuests] = useState([] as string[]);

  //Přidá každého guesta do array a removuje při odebrání inputu.
  const onChangeGuests = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let newArr: string[] = [...guests];
    newArr[Number(e.target.name) - 1] = e.target.value;
    setGuests(newArr);
  };

  const onCancel = () => {
    setIsOpen(false);
    setInputsNumber([1]);
    setGuests([]);
    onAddGuests([]);
  };

  const onSubmitGuests = (e: React.SyntheticEvent) => {
    onAddGuests(guests);
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Add guests</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form>
            {inputsNumber.map((input: number) => {
              return (
                <Input
                  size="sm"
                  placeholder="Please enter guests e-mail"
                  name={String(input)}
                  id={String(input)}
                  onChange={onChangeGuests}
                />
              );
            })}

            <div className="flex justify-end">
              {inputsNumber.length > 1 ? (
                <IconButton
                  size="sm"
                  icon={<AiOutlineMinus />}
                  aria-label="minus"
                  onClick={() => {
                    setInputsNumber((prevNumber: number[]) =>
                      prevNumber.slice(0, -1)
                    );
                    setGuests((prevGuests: string[]) =>
                      prevGuests.slice(0, -1)
                    );
                  }}
                ></IconButton>
              ) : (
                ""
              )}

              <IconButton
                size="sm"
                icon={<GoPlus />}
                aria-label="plus"
                onClick={() => {
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
