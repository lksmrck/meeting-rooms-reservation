import { UserType, UserRights } from "../../../types/types";
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

type AddUserFormProps = {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
  formData: UserType;
  options: UserRights[];
  addUserHandler: (e: React.SyntheticEvent) => void;
  onCancel: () => void;
};

const AddUserForm: React.FC<AddUserFormProps> = ({
  isOpen,
  onClose,
  isLoading,
  onChange,
  formData,
  options,
  addUserHandler,
  onCancel,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add user</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <form>
              <div className="flex w-full m-0.5 ">
                <Input
                  size="sm"
                  type="text"
                  placeholder="John"
                  name="name"
                  id="name"
                  onChange={onChange}
                  value={formData.name}
                  focusBorderColor="teal.400"
                  required
                />
                <Input
                  size="sm"
                  placeholder="Doe"
                  name="surname"
                  id="surname"
                  onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
                value={formData.company}
                disabled
                className="m-0.5"
              />

              <SelectRights
                id="rights"
                name="rights"
                options={options}
                onChange={onChange}
                additionalStyle="m-0.5 rounded-none bg-white text-sm mt-2"
                label="Select user rights:"
                small
              />
            </form>
          )}
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

export default AddUserForm;
