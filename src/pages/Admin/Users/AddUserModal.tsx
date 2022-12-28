import { FC, Dispatch, SetStateAction } from "react";
import { useUsersAdminFncs } from "../../../hooks/useUsersAdminFncs";
import { UserType } from "../../../types/types";
import AddUserForm from "../../../components/admin/users/AddUserForm";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";

type AddUserModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setUsers: Dispatch<SetStateAction<UserType[]>>;
};

const AddUserModal: FC<AddUserModalProps> = ({
  isOpen,
  setIsOpen,
  setUsers,
}) => {
  const { addUser, isLoading, error } = useUsersAdminFncs();

  const addUserHandler = async (formData: UserType): Promise<void> => {
    addUser(formData, setUsers, setIsOpen);
  };

  const onCancel = (): void => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onCancel} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent>
        <AddUserForm
          isLoading={isLoading}
          addUserHandler={addUserHandler}
          onCancel={onCancel}
          isError={error}
        />
      </ModalContent>
    </Modal>
  );
};

export default AddUserModal;
