import { Button } from "@chakra-ui/react";
import { useContext, FC } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../state/AppContext";

const ErrorScreen: FC = () => {
  const navigate = useNavigate();
  const { setError } = useContext(AppContext);

  return (
    <div className="h-screen w-screen bg-indigo-700 text-white flex flex-col justify-center items-center ">
      <div className="h-1/2 flex flex-col items-center">
        <h1 className=" text-2xl mb-5">Something went wrong</h1>
        <Button
          colorScheme="teal"
          onClick={() => {
            setError({ error: false, message: "" });
            navigate(-2);
          }}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default ErrorScreen;
