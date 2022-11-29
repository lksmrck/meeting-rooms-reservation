import { useState, useEffect } from "react";
import { IconButton } from "@chakra-ui/react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { AiOutlineMinusSquare } from "react-icons/ai";
import LoadingSpinner from "../../ui/LoadingSpinner/LoadingSpinner";
import { useUsersAdminFncs } from "../../../hooks/use-usersAdminFncs";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  const { fetchUsers, addUser, deleteUser, isLoading } = useUsersAdminFncs();

  useEffect(() => {
    fetchUsers("secondCompany", setUsers);
    console.log(users);
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

  const deleteUserHandler = (userId: any) => {
    deleteUser("secondCompany", userId, setUsers);
    console.log(userId);
  };

  return (
    <div className="ml-2 w-screen flex justify-center flex-col items-center ">
      {isLoading ? (
        /*  <div className=" h-24"> */
        <LoadingSpinner />
      ) : (
        /*    </div> */
        <>
          <ul className="lg:w-4/12 w-4/5 border shadow-md rounded-lg bg-slate-300 ">
            {users.map((user: any) => {
              const secs = user.timeStamp.seconds;
              const date = new Date(secs * 1000);
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
                      <h3>{date.toLocaleString()}</h3>
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
            onClick={addUserHandler}
            className="h-10 w-10 mt-2"
            size="md"
          />
        </>
      )}
    </div>
  );
};

export default UsersList;
