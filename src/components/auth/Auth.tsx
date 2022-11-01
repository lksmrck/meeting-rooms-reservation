import React from "react";
import Input from "../layout/Input";
import Button from "../layout/MyButton";

const Auth = () => {
  return (
    <section className="flex justify-center mt-4">
      <div className=" flex justify-center w-96 bg-green-50">
        <form className="w-72 p-6 [&>input]:m-1">
          <Input
            id="email"
            name="email"
            type="e-mail"
            placeholder="Enter your e-mail"
          />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
          />
          <div className="flex justify-center ">
            <Button type="submit" text="Submit" />
            <Button text="Back" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Auth;
