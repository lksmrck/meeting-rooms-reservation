import { useState, useEffect } from "react";
import { IconButton } from "@chakra-ui/react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { AiOutlineMinusSquare } from "react-icons/ai";
import LoadingSpinner from "../ui/LoadingSpinner/LoadingSpinner";
import { useUsersAdminFncs } from "../../hooks/use-usersAdminFncs";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  const { fetchUsers, addUser, deleteUser } = useUsersAdminFncs();

  useEffect(() => {
    fetchUsers("secondCompany", setUsers);
  }, []);

  const formData = {
    name: "oave",
    company: "secondCompany",
    email: "mail@mail.cz",
    password: "afsfasdasdasa",
  };

  const addUserHandler = () => {
    addUser(formData, setUsers);
  };

  const deleteUserHandler = (userId: any) => {};

  return (
    <div>
      <ul>
        {users.map((user: any) => {
          return (
            <li className="flex">
              <h2>{user.name}</h2>
              <h3>{user.rights}</h3>
              <h3>{user.creationDate}</h3>
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
            </li>
          );
        })}
      </ul>
      <IconButton
        aria-label="plus"
        colorScheme="facebook"
        icon={<AiOutlinePlusSquare size={25} style={{ color: "#f0fdf4" }} />}
        onClick={addUserHandler}
        className="h-10 w-10 mr-2"
        size="md"
      />
    </div>
  );
};

export default UsersList;
