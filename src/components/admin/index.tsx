import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineMeetingRoom } from "react-icons/md";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className={`w-screen h-content  flex justify-center`}>
      <div className="mt-4 [&>*]:m-2">
        <Button
          name="users"
          colorScheme="facebook"
          leftIcon={<FaUserFriends />}
          onClick={() => {
            navigate(`/settings/users`);
          }}
        >
          Users administration
        </Button>
        <Button
          colorScheme="facebook"
          leftIcon={<MdOutlineMeetingRoom />}
          onClick={() => {
            navigate(`/settings/rooms`);
          }}
        >
          Rooms administration
        </Button>
      </div>
    </div>
  );
};

export default Settings;
