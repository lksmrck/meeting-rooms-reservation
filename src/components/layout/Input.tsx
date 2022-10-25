import React from "react";

interface InputProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ id, name, type, placeholder }) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      required
      className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-5"
    />
  );
};
export default Input;
