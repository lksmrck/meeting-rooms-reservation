import { FC, Dispatch, SetStateAction } from "react";

import { useUsersAdminFncs } from "../../../hooks/useUsersAdminFncs";
import useAuth from "../../../hooks/useAuth";
import { UserType } from "../../../types/types";
import AddUserForm from "../../../components/admin/users/AddUserForm";

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
    addUser(formData, setUsers).then(() => {
      setIsOpen(false);
    });
  };

  const onCancel = (): void => {
    setIsOpen(false);
  };

  return (
    <AddUserForm
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={() => setIsOpen(false)}
      addUserHandler={addUserHandler}
      onCancel={onCancel}
      isError={error}
    />
  );
};

export default AddUserModal;
