import React, { SetStateAction } from "react";
import { MeetingCategory } from "../../../types/types";

type FormSelectProps = {
  name: string;
  id: string;
  options: MeetingCategory[] | any;
  onChange: any;
  small?: boolean;
  margin?: boolean;
  additionalStyle?: string;
};

const FormSelect: React.FC<FormSelectProps> = ({
  name,
  id,
  options,
  onChange,
  small,
  margin,
  additionalStyle,
}) => {
  {
    return (
      <select
        name={name}
        id={id}
        className={`bg-slate-50 border w-full pl-2 focus:outline-teal-600 ${
          small ? "text-sm rounded-sm" : "rounded-md"
        } ${margin ? "mb-2 mt-2" : ""} h-8 ${additionalStyle} `}
        onChange={onChange}
      >
        {options!.map((option: MeetingCategory) => {
          return <option value={option.name}>{option.name}</option>;
        })}
      </select>
    );
  }
};

export default FormSelect;
