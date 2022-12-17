import React, { Dispatch, SetStateAction } from "react";
import { Input, Button } from "@chakra-ui/react";
import { Error } from "../../types/types";

type LoginFormProps = {
  onSubmit: (e: React.SyntheticEvent) => void;
  email: string;
  password: string;
  loginError: Error;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
};

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  email,
  password,
  setEmail,
  setPassword,
  loginError,
}) => {
  return (
    <form className="w-80 mt-12  [&>input]:mt-2 " onSubmit={onSubmit}>
      <Input
        id="email"
        name="email"
        type="e-mail"
        placeholder="Enter your e-mail"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        focusBorderColor="teal.400"
      />
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="Enter your password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        focusBorderColor="teal.400"
      />

      <div className="flex justify-center flex-col [&>button]:mt-1 mt-8">
        <Button colorScheme="teal" type="submit">
          Submit
        </Button>
        <Button colorScheme="teal" variant="outline">
          Back
        </Button>
      </div>
      <p className=" text-red-600 text-sm h-1">
        {loginError.error && loginError.message}
      </p>
    </form>
  );
};

export default LoginForm;
