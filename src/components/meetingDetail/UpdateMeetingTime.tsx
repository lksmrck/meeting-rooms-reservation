import { Dispatch, SetStateAction, FC, ChangeEvent } from "react";
import { NONE } from "../../data/constants";
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
  setMissingFormData: Dispatch<SetStateAction<boolean>>;
};

const UpdateMeetingTime: FC<UpdateMeetingTimeProps> = ({
  updatedTime,
  setUpdatedTime,
  options,
  start,
  end,
  setMissingFormData,
}) => {
  const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>): void => {
    setUpdatedTime({ ...updatedTime, [e.target.name]: e.target.value });
    setMissingFormData(false);
  };

  return (
    <select
      name={start ? "start" : "end"}
      id={start ? "start" : "end"}
      className=" h-8 rounded-sm mb-0.5 border bg-slate-50 text-sm pl-2 focus:outline-teal-600"
      onChange={onChangeSelect}
      defaultValue={NONE}
    >
      <option value={NONE} disabled hidden>
        Select an Option
      </option>
      {options!.map((option: RoomData) => {
        return (
          <option
            key={option?.block}
            value={start ? option?.start : option?.end}
          >
            {start ? option?.start : option?.end}
          </option>
        );
      })}
    </select>
  );
};

export default UpdateMeetingTime;
