import React, { useState, useContext } from "react";
import Input from "../layout/Input";
import Button from "../layout/Button";
import Select from "../layout/Select";
import { rooms } from "../../common/dummyData";
import AppContext from "../../state/AppContext";
const Form: React.FC = () => {
  const appContext = useContext(AppContext);

  return (
    <section className="flex justify-center mt-4">
      <div className=" flex justify-center w-96 bg-green-50">
        <form className="flex flex-col w-72 p-6 [&>input]:m-1">
          {/* Select room */}
          <Select name="rooms" id="rooms" options={rooms} />
          {/* Button to open the modal with checkboxes to reserve time blocks */}
          <Button
            text="Select time"
            onClick={() => {
              appContext?.setOpenModal(true);
            }}
          />
          <Input
            id="room"
            name="room"
            type="number"
            placeholder="Enter your e-mail"
          />
          <label htmlFor="guests">Guests</label>
          <Input
            id="guests"
            name="guests"
            type="checkbox"
            placeholder="Meeting type"
          />

          <Input id="type" name="type" type="text" placeholder="Meeting type" />
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
