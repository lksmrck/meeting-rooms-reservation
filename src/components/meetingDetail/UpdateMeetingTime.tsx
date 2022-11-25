import React /* SetStateAction, useState */ from "react";

type SelectProps = {
  name?: string;
  id?: string;
  options: any;
  start?: boolean;
  end?: boolean;
  setUpdatedTime: any;
  updatedTime: any;
};

const UpdateMeetingTime: React.FC<SelectProps> = ({
  updatedTime,
  setUpdatedTime,
  options,
  start,
  end,
}) => {
  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setUpdatedTime({ ...updatedTime, [e.target.name]: e.target.value });
    console.log(updatedTime);
  };

  {
    return (
      <select
        name={start ? "start" : "end"}
        id={start ? "start" : "end"}
        className=" mt-0.5 bg-slate-50 text-sm pl-2"
        onChange={onChangeSelect}
      >
        {options!.map((option: any) => {
          return (
            <option value={start ? option?.start : option?.end}>
              {start ? option?.start : option?.end}
            </option>
          );
        })}
      </select>
    );
  }
};

export default UpdateMeetingTime;
