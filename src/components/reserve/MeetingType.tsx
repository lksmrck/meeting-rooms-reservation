import React, { SetStateAction, useContext } from "react";
import ReservationContext from "../../state/ReservationContext";

type SelectProps = {
  name?: string;
  id?: string;
  options?: any;
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
      <select name={name} id={id} className="m-2" onChange={onChangeSelect}>
        {options.map((option: any) => {
          return <option value={option.name}>{option.name}</option>;
        })}
      </select>
    );
  }
};

export default MeetingType;
