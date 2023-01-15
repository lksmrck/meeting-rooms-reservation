import { Button } from "@chakra-ui/react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const NotFound: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-violet-300 to-violet-400 text-white  flex flex-col justify-center items-center ">
      <div className="h-1/2 flex flex-col items-center">
        <h1 className=" text-2xl md:text-4xl mb-5 self-center">
          <span className=" font-bold">404.</span>
          <span className="ml-2 text-gray-500">Well, that's an error.</span>
        </h1>
        <p className="text-center mb-4 mx-5">
          The requested URL was not found.
          <span className="text-gray-500 ml-2">That's all we know.</span>
        </p>
        <Button
          colorScheme="teal"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
