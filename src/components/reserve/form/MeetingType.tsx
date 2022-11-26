import React, { SetStateAction } from "react";
import { MeetingCategory } from "../../../types/types";

type SelectProps = {
  name: string;
  id: string;
  options: MeetingCategory[];
  onChange: any;
  small?: boolean;
  margin?: boolean;
};

const MeetingType: React.FC<SelectProps> = ({
  name,
  id,
  options,
  onChange,
  small,
  margin,
}) => {
  {
    return (
      <select
        name={name}
        id={id}
        className={`bg-slate-50 border w-full pl-2 ${
          small ? "text-sm rounded-sm" : "rounded-md"
        } ${margin ? "mb-2 mt-2" : ""} h-8 `}
        onChange={onChange}
      >
        {options!.map((option: MeetingCategory) => {
          return <option value={option.name}>{option.name}</option>;
        })}
      </select>
    );
  }
};

export default MeetingType;
