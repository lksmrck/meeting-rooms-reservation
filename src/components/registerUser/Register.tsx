import React, { useState } from "react";
import Input from "../ui/Input";
import { Button } from "@chakra-ui/react";

import { POWERUSER, READ, ADMIN } from "../../constants/constants";

const initialState = {
  company: "CURRENT",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  rights: "READ",
};

const Register = () => {
  const [registerData, setRegisterData] = useState(initialState);

  const handleChange = (e: any) => {
    //Input name = initial state object properties
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: any) => {
    e.preventDefault();
    //DISPATCH REGISTER
  };

  return (
    <section className="flex justify-center mt-4">
      <div className=" flex justify-center w-96 bg-green-50">
        <h1>"Register user"</h1>
        <form className="w-72 p-6 [&>input]:m-1">
          <div className="flex justify-center">
            <Input
              id="firstName"
              name="firstName"
              type="string"
              placeholder="First name"
              onChange={handleChange}
            />
            <Input
              id="lastName"
              name="lastName"
              type="string"
              placeholder="Last name"
              onChange={handleChange}
            />
          </div>
          <Input
            id="email"
            name="email"
            type="e-mail"
            placeholder="Enter user's e-mail"
            onChange={handleChange}
          />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter user's password"
            onChange={handleChange}
          />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm user's password"
            onChange={handleChange}
          />

          <div className="flex justify-center ">
            <Button type="submit">Login </Button>
            <Button>Back</Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
