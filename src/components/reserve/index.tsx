import React, { useState, useEffect } from "react";
import Form from "./form";
import { useMediaQuery } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import TimeSelect from "./timeSelect";

const Reserve = () => {
  //Velikost displeje. Při sm displeji je form skrytý a zobrazeno open form button
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
    <div className="flex flex-col-reverse md:flex-row justify-center h-full bg-gradient-to-r from-violet-300 to-violet-400 [&>*]:mt-2 pb-5">
      <TimeSelect setBlocksPickError={setBlocksPickError} />
      {mediumScreenMax && !openedForm && (
        <div className="flex justify-center">
          <Button
            colorScheme="yellow"
            onClick={() => setOpenedForm(true)}
            className=" w-56"
          >
            Create a meeting
          </Button>
        </div>
      )}
      {openedForm && (
        <Form
          blocksPickError={blocksPickError}
          isMaxMdScreen={mediumScreenMax}
          setIsFormOpen={setOpenedForm}
        />
      )}
    </div>
  );
};

export default Reserve;
