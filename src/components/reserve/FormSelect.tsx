import { ChangeEvent } from "react";

type OptionsBase = {
  id: number;
  name: string;
};

type FormSelectProps<TValue> = {
  name: string;
  id: string;
  options: TValue[];
  onChange: (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  small?: boolean;
  additionalStyle?: string;
  label?: string;
};

const FormSelect = <TValue extends OptionsBase>({
  name,
  id,
  options,
  onChange,
  small,
  additionalStyle,
  label,
}: FormSelectProps<TValue>) => {
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
          {options!.map((option: OptionsBase) => {
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
