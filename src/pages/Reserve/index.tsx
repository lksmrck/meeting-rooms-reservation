import { useState, useEffect, FC } from "react";
import ReservationForm from "./ReservationForm";
import { useMediaQuery } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import TimeSelect from "./TimeSelect";

const Reserve: FC = () => {
  const [mediumScreenMax] = useMediaQuery("(max-width: 768px)");
  const [openedForm, setOpenedForm] = useState(false);

  useEffect(() => {
    setOpenedForm(!mediumScreenMax);
  }, [mediumScreenMax]);

  const [blocksPickError, setBlocksPickError] = useState({
    error: false,
    message: "",
  });

  return (
    <div className="flex flex-col-reverse md:flex-row justify-center min-h-content bg-gradient-to-r from-violet-300 to-violet-400 [&>*]:mt-2 pb-5">
      <TimeSelect setBlocksPickError={setBlocksPickError} />
      {mediumScreenMax && !openedForm && (
        <div className="flex justify-center">
          <Button
            colorScheme="yellow"
            onClick={() => setOpenedForm(true)}
            className="-ml-2 w-56 font-solid tracking-wider"
            style={{ fontWeight: "bold", fontSize: "20px" }}
          >
            Create a meeting
          </Button>
        </div>
      )}
      {openedForm && (
        <ReservationForm
          blocksPickError={blocksPickError}
          isMaxMdScreen={mediumScreenMax}
          setIsFormOpen={setOpenedForm}
        />
      )}
    </div>
  );
};

export default Reserve;
