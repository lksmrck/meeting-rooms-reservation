import { UserType } from "../../../types/types";

import {
  FormControl,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  Input,
  Button,
} from "@chakra-ui/react";
import SelectRights from "../../reserve/FormSelect";
import { useState, FC, ChangeEvent, SyntheticEvent } from "react";
import useAuth from "../../../hooks/useAuth";
import { USER, userRights } from "../../../data/constants";

type AddUserFormProps = {
  isLoading: boolean;
  addUserHandler: (formData: UserType) => void;
  onCancel: () => void;
  isError: { error: boolean; message: string };
};

const AddUserForm: FC<AddUserFormProps> = ({
  isLoading,
  addUserHandler,
  onCancel,
  isError,
}) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    company: user!.company,
    rights: USER,
    creationDate: new Date().toLocaleString(),
  } as UserType);

  const [missingFormDataError, setMissingFormDataError] = useState(false);

  const inputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    missingFormDataError && setMissingFormDataError(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmitHandler = async (e: SyntheticEvent): Promise<void> => {
    const { name, surname, email, password } = formData;

    setMissingFormDataError(false);

    //Jednoduchá validace, že jsou vyplněna všechna pole
    if (
      name.length > 0 &&
      surname.length > 0 &&
      email.length > 0 &&
      password.length > 0
    ) {
      e.preventDefault();
      addUserHandler(formData);
    } else {
      setMissingFormDataError(true);
    }
  };

  return (
    <>
      <ModalHeader>Add user</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <>
          <FormControl>
            <div className="flex w-full m-0.5 ">
              <Input
                size="sm"
                type="text"
                placeholder="John"
                name="name"
                id="name"
                onChange={inputChangeHandler}
                value={formData.name}
                focusBorderColor="teal.400"
                required
              />
              <Input
                size="sm"
                placeholder="Doe"
                name="surname"
                id="surname"
                onChange={inputChangeHandler}
                value={formData.surname}
                className="ml-0.5"
                focusBorderColor="teal.400"
                required
              />
            </div>
            <Input
              size="sm"
              type="text"
              placeholder="john@doe.com"
              name="email"
              id="email"
              onChange={inputChangeHandler}
              value={formData.email}
              className="m-0.5"
              focusBorderColor="teal.400"
              required
            />
            <Input
              size="sm"
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              onChange={inputChangeHandler}
              value={formData.password}
              className="m-0.5"
              focusBorderColor="teal.400"
              required
            />
            <Input
              size="sm"
              type="text"
              name="company"
              id="company"
              onChange={inputChangeHandler}
              value={formData.company}
              disabled
              className="m-0.5"
            />

            <SelectRights
              id="rights"
              name="rights"
              options={userRights}
              onChange={inputChangeHandler}
              additionalStyle="m-0.5 rounded-none bg-white text-sm mt-2"
              label="Select user rights:"
              small
            />
          </FormControl>
          <div className="h-4 text-sm text-red-500">
            <p>{isError.error && isError.message}</p>
            <p>{missingFormDataError && "Please fill in all fields."}</p>
          </div>
        </>
      </ModalBody>
      <ModalFooter className="[&>button]:m-1 ">
        <Button
          colorScheme="teal"
          onClick={formSubmitHandler}
          isLoading={isLoading}
          loadingText={"Creating user"}
        >
          Submit
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </ModalFooter>
    </>
  );
};

export default AddUserForm;
