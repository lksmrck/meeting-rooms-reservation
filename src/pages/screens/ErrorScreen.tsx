import { Button } from "@chakra-ui/react";
import { useContext, FC } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../state/AppContext";

const ErrorScreen: FC = () => {
  const navigate = useNavigate();
  const { setError } = useContext(AppContext);

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-violet-300 to-violet-400 text-white flex flex-col justify-center items-center ">
      <div className="h-1/2 flex flex-col items-center">
        <h1 className=" text-2xl md:text-4xl  mx-5 text-center">
          <span className="font-bold">Oops...</span>
          <span className="ml-2 text-gray-500">Something went wrong.</span>
        </h1>
        <p className="text-gray-500 text-center mb-5 mt-2">
          Please try again later.
        </p>
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
