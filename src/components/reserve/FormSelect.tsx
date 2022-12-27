import { MeetingCategory, UserRights } from "../../types/types";
import { FC } from "react";

type FormSelectProps = {
  name: string;
  id: string;
  options: MeetingCategory[] | UserRights[];
  onChange: (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
  small?: boolean;
  additionalStyle?: string;
  label?: string;
};

const FormSelect: FC<FormSelectProps> = ({
  name,
  id,
  options,
  onChange,
  small,
  additionalStyle,
  label,
}) => {
  {
    return (
      <div className={`${additionalStyle}`}>
        {label && (
          <label htmlFor={id} className={`ml-0.5 font-bold`}>
            {label}
          </label>
        )}
        <select
          name={name}
          id={id}
          className={`bg-slate-50 border w-full pl-2 focus:outline-teal-600 ${
            small ? "text-sm rounded-sm" : "rounded-md"
          }  h-8  `}
          onChange={onChange}
        >
          {options!.map((option: MeetingCategory) => {
            return (
              <option key={option.name} value={option.name}>
                {option.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
};

export default FormSelect;
