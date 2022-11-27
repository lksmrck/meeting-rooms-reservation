import React, { Dispatch, SetStateAction } from "react";
import { NONE } from "../../constants/constants";
import { RoomData } from "../../types/types";

type UpdateMeetingTimeProps = {
  name?: string;
  id?: string;
  options: RoomData[];
  start?: boolean;
  end?: boolean;
  updatedTime: { start: string | null; end: string | null };
  setUpdatedTime: Dispatch<
    SetStateAction<{ start: string | null; end: string | null }>
  >;
  setMissingFormData: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdateMeetingTime: React.FC<UpdateMeetingTimeProps> = ({
  updatedTime,
  setUpdatedTime,
  options,
  start,
  end,
  setMissingFormData,
}) => {
  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setUpdatedTime({ ...updatedTime, [e.target.name]: e.target.value });
    setMissingFormData(false);
  };

  {
    return (
      <select
        name={start ? "start" : "end"}
        id={start ? "start" : "end"}
        className=" h-8 rounded-sm mb-0.5 border bg-slate-50 text-sm pl-2"
        onChange={onChangeSelect}
      >
        <option value={NONE} selected disabled hidden>
          Select an Option
        </option>
        {options!.map((option: any) => {
          return (
            <option
              key={start ? option?.start : option?.end}
              value={start ? option?.start : option?.end}
            >
              {start ? option?.start : option?.end}
            </option>
          );
        })}
      </select>
    );
  }
};

export default UpdateMeetingTime;
