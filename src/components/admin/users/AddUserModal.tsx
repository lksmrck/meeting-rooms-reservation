import React, { useState, useContext, Dispatch, SetStateAction } from "react";
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
import AuthContext from "../../../state/AuthContext";
import SelectRights from "../../reserve/form/FormSelect";
import { userRights, USER } from "../../../common/constants";
import { useUsersAdminFncs } from "../../../hooks/useUsersAdminFncs";

type AddUserModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setUsers: Dispatch<SetStateAction<any>>;
};

const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  setIsOpen,
  setUsers,
}) => {
  const { company } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    company,
    rights: USER,
    creationDate: new Date().toLocaleString(),
  });

  const { addUser } = useUsersAdminFncs();

  const addUserHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    addUser(formData, setUsers);
    setIsOpen(false);
  };

  const onCancel = () => {
    setIsOpen(false);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add user</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
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
        </ModalBody>
        <ModalFooter className="[&>button]:m-1 ">
          <Button colorScheme="teal" onClick={addUserHandler}>
            Submit
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddUserModal;
