import React, { useState, useContext } from "react";
import { Button } from "@chakra-ui/react";
import MeetingType from "./MeetingType";
import AuthContext from "../../../state/AuthContext";
import { meetingTypes } from "../../../constants/constants";
import { Input } from "@chakra-ui/react";
import GuestsModal from "./GuestsModal";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../config/firebase";
import ReservationContext from "../../../state/ReservationContext";
import { useNavigate } from "react-router-dom";

import { RoomData } from "../../../types/types";
import DisplayedGuests from "./DisplayedGuests";

const Form: React.FC = () => {
  const navigate = useNavigate();
  const { company, user } = useContext(AuthContext);
  const { pickedDate, pickedRoom } = useContext(ReservationContext);

  //Po submitnutí je button disabled, aby se nedalo kliknout víckrát během jednoho submitu
  const [disabledBtn, setDisabledBtn] = useState(false);

  //FormData
  //1.meeting name
  const [formData, setFormData] = useState({ name: "", type: "call" });

  //2.guests
  const [guests, setGuests] = useState<string[] | []>([]);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const onAddGuests = (guests: string[]) => {
    setGuests(guests);
  };

  const [missingFormData, setMissingFormData] = useState(false);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setDisabledBtn(true);
    setMissingFormData(false);

    //Čísla vybraných bloků k rezervaci
    let blocks: number[] = [];
    pickedRoom.roomData.forEach((data: RoomData) => {
      if (data.selected) blocks.push(data.block);
    });
    const { name, type } = formData;

    const newMeeting = {
      id: Date.now(),
      date: pickedDate,
      name,
      type,
      room: pickedRoom.id,
      blocks,
      creator: user!.email,
      guests,
    };

    //Check, zda je vyplněný název meetingu a vybrané bloky. Zbytek dat je nepovinný, nebo se vezme automaticky.
    if (
      newMeeting.blocks.length > 0 &&
      newMeeting.name &&
      newMeeting.name.length >= 1
    ) {
      const dbRef = doc(
        db,
        `companies/secondCompany/rooms`,
        String(pickedRoom.id)
      ); //UPRAVIT DYNAMICKY
      await updateDoc(dbRef, { meetings: arrayUnion(newMeeting) });
      /*  setName(""); */
      setFormData({ name: "", type: "" });
      navigate("/overview");
      setMissingFormData(false);
    } else {
      setMissingFormData(true);
    }
  };

  return (
    <section className="flex justify-center ml-6">
      <div className=" flex flex-col justify-center  bg-green-50 h-2/5 rounded-lg ">
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
            onChange={onChangeInput}
            value={formData.name}
            style={{ backgroundColor: "white" }}
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
            />
          )}
          <MeetingType
            name="type"
            id="type"
            options={meetingTypes}
            onChange={onChangeInput}
            margin
          />
          <div className="flex flex-col justify-center [&>button]:mt-1 ">
            <Button
              colorScheme="teal"
              type="submit"
              disabled={disabledBtn && !missingFormData}
            >
              Reserve
            </Button>
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={() => {
                navigate("/overview");
              }}
            >
              Back
            </Button>
          </div>
          {missingFormData && (
            <p className="w-72  text-xs text-red-600">
              Please fill in meeting name and pick meeting blocks to reserve.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Form;
