import { useState, useEffect, FC } from "react";
import { Button } from "@chakra-ui/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import LoadingSpinner from "../../../components/ui/LoadingSpinner/LoadingSpinner";
import { useUsersAdminFncs } from "../../../hooks/useUsersAdminFncs";
import AddUserModal from "./AddUserModal";
import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";
import User from "../../../components/admin/users/User";
import { UserType } from "../../../types/types";

const UsersList: FC = () => {
  const [users, setUsers] = useState([] as UserType[]);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);

  const { fetchUsers, isLoading } = useUsersAdminFncs();

  useEffect(() => {
    console.log("use effect fetch");
    fetchUsers(setUsers);
  }, []);

  const tableColumns = ["Name", "Surname", "Rights", "Creation date", "Delete"];

  return (
    <div className="ml-2 w-screen h-content flex flex-col items-center ">
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
          <TableContainer className="mt-5">
            <Table>
              <Thead>
                <Tr>
                  {tableColumns.map((columnName: string) => {
                    return <Th>{columnName}</Th>;
                  })}
                </Tr>
              </Thead>
              <Tbody>
                {users.map((user: UserType) => {
                  return <User user={user} setUsers={setUsers} />;
                })}
              </Tbody>
            </Table>
          </TableContainer>
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
