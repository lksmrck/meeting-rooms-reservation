import { useState, FC, SyntheticEvent } from "react";
import { Input, Button } from "@chakra-ui/react";
import useLogin from "../../hooks/useLogin";
import LoadingSpinner from "../ui/LoadingSpinner/LoadingSpinner";

const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser, isLoading, loginError } = useLogin();

  const submitHandler = (e: SyntheticEvent): void => {
    e.preventDefault();
    loginUser(email, password);
  };

  return (
    <form
      className=" w-3/4 mt-16 md:mt-12  [&>input]:mt-2 "
      onSubmit={submitHandler}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
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
        </>
      )}
    </form>
  );
};

export default LoginForm;
