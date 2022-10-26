import React from "react";

interface ButtonProps {
  text: string | number;
  type?: "button" | "submit";
  onClick?: React.MouseEventHandler<HTMLButtonElement>; //pak odebrat otaznik
  additionalStyle?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  type,
  onClick,
  additionalStyle,
}) => {
  return (
    <button
      type={type ? type : "button"}
      className={`bg-red-300 rounded-lg px-4 py-2 hover:bg-red-500 shadow-md m-2 transition-all active:transform active:scale-95 active:shadow-sm ${additionalStyle}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
