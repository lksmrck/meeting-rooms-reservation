import { UserType } from "../../../types/types";
import LoadingSpinner from "../../ui/LoadingSpinner/LoadingSpinner";
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
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
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  addUserHandler: (formData: UserType) => void;
  onCancel: () => void;
  isError: { error: boolean; message: string };
};

const AddUserForm: FC<AddUserFormProps> = ({
  isOpen,
  onClose,
  isLoading,
  addUserHandler,
  onCancel,
  isError,
}) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    company: user!.company,
    rights: USER,
    creationDate: new Date().toLocaleString(),
  });

  const inputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmitHandler = (e: SyntheticEvent): void => {
    e.preventDefault();
    addUserHandler(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add user</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {isLoading ? (
            <LoadingSpinner />
          ) : isError.error ? (
            <div>{isError.message}</div>
          ) : (
            <form>
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
            </form>
          )}
        </ModalBody>
        <ModalFooter className="[&>button]:m-1 ">
          <Button colorScheme="teal" onClick={formSubmitHandler}>
            Submit
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddUserForm;
