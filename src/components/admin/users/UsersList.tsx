import { useState, useEffect } from "react";
import { IconButton } from "@chakra-ui/react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { AiOutlineMinusSquare } from "react-icons/ai";
import LoadingSpinner from "../../ui/LoadingSpinner/LoadingSpinner";
import { useUsersAdminFncs } from "../../../hooks/use-usersAdminFncs";
import AddUserModal from "./AddUserModal";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);

  const { fetchUsers, addUser, deleteUser, isLoading } = useUsersAdminFncs();

  useEffect(() => {
    fetchUsers("secondCompany", setUsers);
  }, []);

  const formData = {
    name: "oave",
    company: "secondCompany",
    email: "mail@mail.cz",
    password: "afsfasdasdasa",
    rights: "admin",
    creationDate: new Date().toLocaleString(),
  };

  const addUserHandler = () => {
    addUser(formData, setUsers);
  };

  const deleteUserHandler = (userId: any) => {
    deleteUser("secondCompany", userId, setUsers);
  };

  return (
    <div className="ml-2 w-screen flex justify-center flex-col items-center ">
      {isLoading ? (
        <LoadingSpinner />
      ) : addUserModalOpen ? (
        <AddUserModal
          isOpen={addUserModalOpen}
          setIsOpen={setAddUserModalOpen}
          setUsers={setUsers}
        />
      ) : (
        <>
          <ul className="lg:w-4/12 w-4/5 border shadow-md rounded-lg bg-slate-300 ">
            {users.map((user: any) => {
              return (
                <div className="flex mt-1 border-b-2">
                  <li className="flex w-4/5 ml-1 mb-1 justify-between">
                    <div>
                      <h2>{user.name}</h2>
                    </div>
                    <div>
                      <h3>{user.rights}</h3>
                    </div>
                    <div>
                      <h3>{user.creationDate}</h3>
                    </div>
                  </li>
                  <div className="w-1/5 flex justify-end  mb-1">
                    <IconButton
                      aria-label="plus"
                      colorScheme="red"
                      icon={
                        <AiOutlineMinusSquare
                          size={15}
                          style={{ color: "#f0fdf4" }}
                        />
                      }
                      onClick={() => {
                        deleteUserHandler(user.id);
                      }}
                      className=" w-5 mr-2"
                      size="xs"
                    />
                  </div>
                </div>
              );
            })}
          </ul>
          <IconButton
            aria-label="plus"
            colorScheme="facebook"
            icon={
              <AiOutlinePlusSquare size={25} style={{ color: "#f0fdf4" }} />
            }
            onClick={() => {
              setAddUserModalOpen(true);
            }}
            className="h-10 w-10 mt-2"
            size="md"
          />
        </>
      )}
    </div>
  );
};

export default UsersList;
