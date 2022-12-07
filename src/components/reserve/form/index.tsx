import React, { useState, useContext, Dispatch, SetStateAction } from "react";
import { Button, IconButton } from "@chakra-ui/react";
import MeetingType from "./FormSelect";
import useAuth from "../../../hooks/useAuth";
import { meetingTypes } from "../../../common/constants";
import { Input } from "@chakra-ui/react";
import GuestsModal from "./GuestsModal";
import ReservationContext from "../../../state/ReservationContext";
import { useNavigate, useParams } from "react-router-dom";
import { RoomData } from "../../../types/types";
import DisplayedGuests from "./DisplayedGuests";
import { useAddMeeting } from "../../../hooks/useAddMeeting";
import { CALL } from "../../../common/constants";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsArrowUp } from "react-icons/bs";
import { paramsToDate } from "../../../utils/dateParamsFormat";

type FormProps = {
  blocksPickError: { error: boolean; message: string };
  isMaxMdScreen: boolean;
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
};

const Form: React.FC<FormProps> = ({
  blocksPickError,
  isMaxMdScreen,
  setIsFormOpen,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { /* pickedDate, */ pickedRoom } = useContext(ReservationContext);
  const { addMeeting } = useAddMeeting();

  //Date + room ID z params
  const { pickedDate, pickedRoomId } = useParams();
  const formatedDate = paramsToDate(pickedDate);

  //Po submitnutí je button disabled, aby se nedalo kliknout víckrát během jednoho submitu
  const [disabledBtn, setDisabledBtn] = useState(false);

  //Data z formu
  const [formData, setFormData] = useState({ name: "", type: CALL });

  //Guests
  const [guests, setGuests] = useState<string[] | []>([]);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const onAddGuests = (guests: string[]) => {
    setGuests(guests);
  };

  const [missingFormDataError, setMissingFormDataError] = useState(false);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMissingFormDataError(false);
    setDisabledBtn(false);
  };

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setDisabledBtn(true);
    setMissingFormDataError(false);

    //Čísla vybraných bloků k rezervaci
    let blocks: number[] = [];
    pickedRoom.roomData.forEach((data: RoomData) => {
      if (data.selected) blocks.push(data.block);
    });
    const { name } = formData;

    const newMeeting = {
      ...formData,
      id: Date.now(),
      date: formatedDate,
      room: pickedRoomId,
      blocks,
      creator: user!.email,
      guests,
    };

    //Check, zda je vyplněný název meetingu a vybrané bloky. Zbytek dat je nepovinný, nebo se vezme automaticky.
    if (blocks.length > 0 && name && name.length >= 1) {
      addMeeting(
        newMeeting,
        pickedRoomId,
        `/date/${pickedDate}/overview`,
        setFormData
      );
      setMissingFormDataError(false);
    } else {
      setMissingFormDataError(true);
    }
  };

  return (
    <section className="flex justify-center md:ml-6 ">
      <div className=" flex flex-col justify-center bg-green-50 pt-4 h-96 md:h-2/5 rounded-lg  ">
        <h1 className="text-lg font-bold flex justify-center">
          Create a meeting
        </h1>
        <form
          className="flex flex-col w-72 p-4 [&>input]:mb-4"
          onSubmit={submitHandler}
        >
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter the meeting name"
            onChange={inputChangeHandler}
            value={formData.name}
            style={{ backgroundColor: "white" }}
            focusBorderColor="teal.400"
          />

          {guests.length > 0 ? (
            <DisplayedGuests
              guests={guests}
              setGuestsOpenModal={setIsGuestModalOpen}
              form
            />
          ) : (
            <Button
              colorScheme={"purple"}
              leftIcon={<AiOutlinePlusCircle size={20} />}
              onClick={() => {
                setIsGuestModalOpen(true);
              }}
            >
              Add guests
            </Button>
          )}

          {isGuestModalOpen && (
            <GuestsModal
              isOpen={isGuestModalOpen}
              setIsOpen={setIsGuestModalOpen}
              onAddGuests={onAddGuests}
              addedGuests={guests}
            />
          )}
          <MeetingType
            name="type"
            id="type"
            options={meetingTypes}
            onChange={inputChangeHandler}
            label="Select meeting type:"
            additionalStyle="mt-2 mb-2 text-sm"
          />
          <div className="flex flex-col justify-center [&>button]:mt-1 ">
            <Button
              colorScheme="teal"
              type="submit"
              disabled={disabledBtn && !missingFormDataError}
            >
              Reserve
            </Button>
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={() => {
                navigate(`/date/${pickedDate}/overview`);
              }}
            >
              {isMaxMdScreen ? "Back to overview" : "Back"}
            </Button>
            {isMaxMdScreen && (
              <div className="mt-4 flex justify-center">
                <IconButton
                  colorScheme="yellow"
                  aria-label="arrow-up"
                  icon={<BsArrowUp />}
                  className="w-1/4"
                  onClick={() => setIsFormOpen(false)}
                />
              </div>
            )}
          </div>
          <p className="h-1 text-xs text-red-600">
            {blocksPickError.error && blocksPickError.message}
          </p>
          <p className="mt-3 h-1 text-xs text-red-600">
            {missingFormDataError &&
              "Please fill in meeting name and pick meeting blocks."}
          </p>
        </form>
      </div>
    </section>
  );
};

export default Form;
