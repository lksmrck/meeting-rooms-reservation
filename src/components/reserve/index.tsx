import React, { useState, useEffect } from "react";
import Form from "./form";
import { useMediaQuery } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

import TimeSelect from "./timeSelect";

const Reserve = () => {
  /*   const [smallScreen] = useMediaQuery("(min-width: 640px)");
  const [largeScreen] = useMediaQuery("(min-width: 1024px)"); */
  const [mediumScreenMax] = useMediaQuery("(max-width: 768px)");
  const [openedForm, setOpenedForm] = useState(false);
  /* console.log(mediumScreenMax); */
  console.log(openedForm);
  /*   console.log(largeScreen); */

  useEffect(() => {
    setOpenedForm(!mediumScreenMax);
  }, [mediumScreenMax]);

  const [blocksPickError, setBlocksPickError] = useState({
    error: false,
    message: "",
  });
  /*  const appContext = useContext(AppContext) */ /* return <>{appContext?.openModal ? <TimeModal /> : <Form />}</>; */
  return (
    <div className="flex flex-col-reverse md:flex-row justify-center h-full bg-gradient-to-r from-violet-300 to-violet-400 [&>*]:mt-2">
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
      {openedForm && <Form blocksPickError={blocksPickError} />}
    </div>
  );
};

export default Reserve;
