import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { FC } from "react";

const Unauthorized: FC = () => {
  const navigate = useNavigate();
  return (
    <section className="h-content flex flex-col justify-start items-center">
      <div className="mt-20 border rounded-lg bg-gray-200 p-5 flex flex-col justify-center items-center">
        <h1 className="font-bold text-xl">Unauthorized</h1>
        <br />
        <p>You do not have access to the requested page.</p>
        <Button
          colorScheme="purple"
          onClick={() => navigate(-1)}
          className="mt-5"
        >
          Go Back
        </Button>
      </div>
    </section>
  );
};

export default Unauthorized;
