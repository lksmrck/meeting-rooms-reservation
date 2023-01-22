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
    let newArr: string[] = [...guests];
    newArr[Number(e.target.name) - 1] = e.target.value;
    setGuests(newArr);
    console.log(guests);
  };

  const onCancel = (): void => {
    setIsOpen(false);
    setInputsNumber([1]);
  };

  const onSubmitGuests = (e: SyntheticEvent): void => {
    onAddGuests(guests);
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
