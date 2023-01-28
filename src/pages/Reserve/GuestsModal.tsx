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
import {
  useState,
  SyntheticEvent,
  ChangeEvent,
  SetStateAction,
  Dispatch,
  FC,
} from "react";
import { GoPlus } from "react-icons/go";
import { AiOutlineMinus } from "react-icons/ai";

type GuestsModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onAddGuests: (guests: string[]) => void;
  addedGuests: string[];
};

const GuestsModal: FC<GuestsModalProps> = ({
  isOpen,
  setIsOpen,
  onAddGuests,
  addedGuests,
}) => {
  const [guests, setGuests] = useState(addedGuests);
  const initialInputsNumber = guests.map((guest: string, index: number) => {
    return index + 1;
  });

  //Array na základě kt. se pak mapujou inputy - pokud jsou už ve state nějací guesti, tak bude počáteční state array s čísly guestů např [1,2,3]. Pokud nejsou guesti ve state, tak bude initial state [1]
  const [inputsNumber, setInputsNumber] = useState<number[]>(
    initialInputsNumber.length > 1 ? initialInputsNumber : [1]
  );

  //Přidá každého guesta do array a removuje při odebrání inputu.
  const onChangeGuests = (e: ChangeEvent<HTMLInputElement>): void => {
    let modifiedGuestsArray: string[] = [...guests];
    modifiedGuestsArray[Number(e.target.name) - 1] = e.target.value;
    setGuests(modifiedGuestsArray);
  };

  const onCancel = (): void => {
    setIsOpen(false);
    setInputsNumber([1]);
  };

  const submitGuestsHandler = (e: SyntheticEvent): void => {
    let cleanedGuestsArray: string[] = [];
    //Validace pro případ, že user nechá nevyplněné pole pro guesty
    guests.forEach((guest: string) => {
      if (!guest) return;
      if (guest.length < 1) return;
      cleanedGuestsArray.push(guest);
    });
    onAddGuests(cleanedGuestsArray);
    setIsOpen(false);
  };
  const removeGuestsHandler = () => {
    onAddGuests([]);
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      motionPreset="slideInBottom"
    >
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
                  value={guests[input - 1]}
                />
              );
            })}

            <div className="flex justify-end">
              {inputsNumber.length > 1 && (
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
          {guests.length > 0 && (
            <Button colorScheme="red" onClick={removeGuestsHandler}>
              Remove all guests
            </Button>
          )}
          <Button colorScheme="teal" onClick={submitGuestsHandler}>
            Save
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GuestsModal;
