import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <section>
      <h1>Unauthorized</h1>
      <br />
      <p>You do not have access to the requested page.</p>
      <div>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    </section>
  );
};

export default Unauthorized;
