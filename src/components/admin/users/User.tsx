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
  const { id, name, surname, rights, creationDate } = user;

  const deleteUserHandler = (userId: string) => {
    removeUser("secondCompany", userId, setUsers);
    console.log("userID: " + userId);
  };

  return (
    <Tr>
      <Th>{name}</Th>
      <Th>{surname}</Th>
      <Th>{rights}</Th>
      <Th>{creationDate}</Th>
      <Th isNumeric>
        <IconButton
          aria-label="minus"
          colorScheme="red"
          icon={<AiOutlineMinusCircle size={15} style={{ color: "#f0fdf4" }} />}
          onClick={() => {
            deleteUserHandler(id!);
          }}
          className=" w-5 mr-2"
          size="xs"
        />
      </Th>
    </Tr>
  );
};

export default User;
