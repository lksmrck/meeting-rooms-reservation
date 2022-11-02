import React, { useState, useContext } from "react";
import Input from "../layout/Input";
import Button from "../layout/MyButton";
import Select from "../layout/Select";
import { rooms } from "../../common/dummyData";
import AppContext from "../../state/AppContext";
import { meetingTypes } from "../../constants/data";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase";

const Form: React.FC = () => {
  const appContext = useContext(AppContext);
  if (!appContext) return null;
  //nepouzito zatim
  const { setOpenModal } = appContext;

  //FormData
  //1.meeting name
  const [name, setName] = useState<string>();
  //2.room

  //3.guests
  const [guests, setGuests] = useState<string[]>([]);

  //4.meeting type

  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setName(e.target.value);

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();

    const response = await addDoc(collection(db, "cities"), {
      name: "Los Angeles",
      state: "CA",
      country: "USA",
      timeStamp: serverTimestamp(), //čas přidání
    });
    console.log(response.id);
  };

  return (
    <section className="flex justify-center mt-4">
      <div className=" flex justify-center w-96 bg-green-50">
        <form className="flex flex-col w-72 p-6 [&>input]:m-1">
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter the meeting name"
            onChange={onChangeInputHandler}
          />
          {/* Select room */}
          <Select name="rooms" id="rooms" options={rooms} />
          {/* Button to open the modal with checkboxes to reserve time blocks */}
          <Button
            text="Add guests"
            //VYUZIT
            onClick={() => {
              setOpenModal(true);
            }}
          />

          {/* <label htmlFor="guests">Guests</label>
          <Input
            id="guests"
            name="guests"
            type="checkbox"
            placeholder="Meeting type"
          /> */}

          <Select name="rooms" id="rooms" options={meetingTypes} />
          <div className="flex justify-center ">
            <Button type="submit" text="Reserve" />
            <Button text="Back" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Form;
