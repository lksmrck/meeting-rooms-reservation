import { Tr, Th } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { useUsersAdminFncs } from "../../../hooks/useUsersAdminFncs";
import { UserType } from "../../../types/types";

import { FC, Dispatch, SetStateAction } from "react";

type UserProps = {
  user: UserType;
  setUsers: Dispatch<SetStateAction<UserType[]>>;
};

const User: FC<UserProps> = ({ user, setUsers }) => {
  const { removeUser } = useUsersAdminFncs();

  const deleteUserHandler = (userId: any) => {
    removeUser("secondCompany", userId, setUsers);
    console.log("userID: " + userId);
  };

  return (
    <Tr>
      <Th>{user.name}</Th>
      <Th>{user.surname}</Th>
      <Th>{user.rights}</Th>
      <Th>{user.creationDate}</Th>
      <Th isNumeric>
        <div className=" flex justify-end ">
          <IconButton
            aria-label="minus"
            colorScheme="red"
            icon={
              <AiOutlineMinusCircle size={15} style={{ color: "#f0fdf4" }} />
            }
            onClick={() => {
              deleteUserHandler(user.id);
            }}
            className=" w-5 mr-2"
            size="xs"
          />
        </div>
      </Th>
    </Tr>
  );
};

export default User;
