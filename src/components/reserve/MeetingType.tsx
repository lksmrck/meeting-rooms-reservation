import React, { SetStateAction, useContext } from "react";
import ReservationContext from "../../state/ReservationContext";
import { MeetingCategory } from "../../types/types";

type SelectProps = {
  name?: string;
  id?: string;
  options?: MeetingCategory[];
  setMeetingType: React.Dispatch<SetStateAction<string>>;
};

const MeetingType: React.FC<SelectProps> = ({
  name,
  id,
  options,
  setMeetingType,
}) => {
  const reservationContext = useContext(ReservationContext);

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setMeetingType(e.target.value);
  };
  {
    return (
      <select
        name={name}
        id={id}
        className="mt-2 mb-4"
        onChange={onChangeSelect}
      >
        {options!.map((option: MeetingCategory) => {
          return <option value={option.name}>{option.name}</option>;
        })}
      </select>
    );
  }
};

export default MeetingType;
