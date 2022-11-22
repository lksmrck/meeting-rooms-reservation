import React, { SetStateAction } from "react";

type SelectProps = {
  name?: string;
  id?: string;
  options: any;
  start?: boolean;
  end?: boolean;
};

const UpdateMeetingTime: React.FC<SelectProps> = ({
  /*   name,
  id,
  options,
  setMeetingType, */
  options,
  start,
  end,
}) => {
  /*   const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setMeetingType(e.target.value);
  }; */

  {
    return (
      <select
        name={start ? "start" : "end"}
        id={start ? "start" : "end"}
        className="mt-2 mb-4"
        /*  onChange={onChangeSelect} */
      >
        {options!.map((option: any) => {
          return (
            <option value={start ? option.start : option.end}>
              {start ? option.start : option.end}
            </option>
          );
        })}
      </select>
    );
  }
};

export default UpdateMeetingTime;
