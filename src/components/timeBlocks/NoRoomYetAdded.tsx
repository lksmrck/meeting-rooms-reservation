import { FC } from "react";
import useAuth from "../../hooks/useAuth";
import { ADMIN } from "../../data/constants";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NoRoomYetAdded: FC = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const clickButtonHandler = () => {
    navigate("/settings/rooms");
  };

  return (
    <div className="flex flex-col justify-center items-center text-sm text-white font-bold text-center">
      <p className="my-2 mt-8 mb-4">No room was yet added.</p>

      {user?.rights == ADMIN ? (
        <Button size="sm" colorScheme="teal" onClick={clickButtonHandler}>
          Add room
        </Button>
      ) : (
        <p>Please contact your local admin to add the room.</p>
      )}
    </div>
  );
};

export default NoRoomYetAdded;
