import React, { useState, useContext, Dispatch, SetStateAction } from "react";
import { userRights, USER } from "../../../data/constants";
import { useUsersAdminFncs } from "../../../hooks/useUsersAdminFncs";
import useAuth from "../../../hooks/useAuth";
import { UserType } from "../../../types/types";
import AddUserForm from "../../../components/admin/users/AddUserForm";

type AddUserModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setUsers: Dispatch<SetStateAction<UserType[]>>;
};

const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  setIsOpen,
  setUsers,
}) => {
  const { addUser, fetchUsers, isLoading, error } = useUsersAdminFncs();

  const addUserHandler = async (formData: UserType): Promise<void> => {
    addUser(formData, setUsers)
      .then(() => {
        fetchUsers(setUsers);
      })
      .then(() => {
        /*     setTimeout(() => { */
        setIsOpen(false);
        /*      }, 100); */
      });
    /*   .then(() => {
        console.log("delam neco po zavreni modalu");
        fetchUsers(setUsers);
      }); */
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
