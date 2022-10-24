import React from "react";

interface ButtonProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text }) => {
  return (
    <button className=" bg-red-300 rounded-lg px-4 py-2 hover:bg-red-500 shadow-md m-2 transition-all active:transform active:scale-95 active:shadow-sm">
      {text}
    </button>
  );
};

export default Button;
