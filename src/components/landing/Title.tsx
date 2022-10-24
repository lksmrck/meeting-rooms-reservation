import React from "react";
import Button from "../layout/Button";

const Title = () => {
  return (
    <div className="flex flex-col mx-auto justify-center border border-5 mt-5">
      <h1 className="text-3xl text-center">
        Comfortly reserve your company conference rooms with few clicks.
      </h1>
      <div className="flex justify-center mt-5">
        <Button text="Get Started" />
      </div>
    </div>
  );
};

export default Title;
