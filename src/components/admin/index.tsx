import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen  flex justify-center">
      <div className="mt-4 [&>*]:m-2">
        <Button
          name="users"
          colorScheme="facebook"
          onClick={() => {
            navigate(`/settings/users`);
          }}
        >
          Users administration
        </Button>
        <Button
          colorScheme="facebook"
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
