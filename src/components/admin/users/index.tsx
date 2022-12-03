import { useState, useEffect } from "react";
import { Button, IconButton } from "@chakra-ui/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
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
          <ul className="lg:w-6/12 w-4/5 mt-4  ">
            <li className="flex mt-1 border-b-2 shadow-md rounded-lg bg-slate-500 ">
              <div className="flex w-4/5 ml-1 mb-1 justify-between">
                <h2>Name</h2>
                <h2>Surname</h2>
                <h3>User rights</h3>
                <h3>Creation date</h3>
              </div>
            </li>
            {users.map((user: any) => {
              return (
                <li className="flex mt-1 border-b-2 shadow-md rounded-lg bg-slate-300">
                  <div className="flex w-4/5 ml-1 mb-1 justify-between">
                    <h2>{user.name}</h2>
                    <h2>{user.surname}</h2>

                    <h3>{user.rights}</h3>

                    <h3>{user.creationDate}</h3>
                  </div>
                  <div className="w-1/5 flex justify-end  mb-1">
                    <IconButton
                      aria-label="plus"
                      colorScheme="red"
                      icon={
                        <AiOutlineMinusCircle
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
                </li>
              );
            })}
          </ul>
          <Button
            colorScheme="facebook"
            leftIcon={
              <AiOutlinePlusCircle size={25} style={{ color: "#f0fdf4" }} />
            }
            onClick={() => {
              setAddUserModalOpen(true);
            }}
            className="mt-2"
          >
            Add user
          </Button>
        </>
      )}
    </div>
  );
};

export default UsersList;
