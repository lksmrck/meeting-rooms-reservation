import React from "react";

interface ButtonProps {
  text: string;
  type?: "button" | "submit";
}

const Button: React.FC<ButtonProps> = ({ text, type }) => {
  return (
    <button
      type={type ? type : "button"}
      className=" bg-red-300 rounded-lg px-4 py-2 hover:bg-red-500 shadow-md m-2 transition-all active:transform active:scale-95 active:shadow-sm"
    >
      {text}
    </button>
  );
};

export default Button;
