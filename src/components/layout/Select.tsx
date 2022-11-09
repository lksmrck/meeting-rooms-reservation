import React, { useContext, useState } from "react";
import ReservationContext from "../../state/ReservationContext";
import { rooms } from "../../common/dummyData";

type SelectProps = {
  name?: string;
  id?: string;
  options?: any;
};

const Select: React.FC<SelectProps> = ({ name, id, options }) => {
  const reservationContext = useContext(ReservationContext);

  const { meetingType, setMeetingType } = reservationContext;

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setMeetingType(e.target.value);
  };
  {
    return (
      <select name={name} id={id} className="m-2" onChange={onChangeSelect}>
        {options.map((option: any) => {
          return <option value={option.id}>{option.name}</option>;
        })}
      </select>
    );
  }
};

export default Select;
