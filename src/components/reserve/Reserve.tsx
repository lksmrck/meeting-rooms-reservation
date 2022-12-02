import React, { useState } from "react";
import Form from "./form/Form";

import TimeSelect from "./timeSelect/TimeSelect";

const Reserve = () => {
  const [blocksPickError, setBlocksPickError] = useState({
    error: false,
    message: "",
  });
  /*  const appContext = useContext(AppContext) */ /* return <>{appContext?.openModal ? <TimeModal /> : <Form />}</>; */
  return (
    <div className="flex justify-center h-full bg-gradient-to-r from-violet-300 to-violet-400 [&>*]:mt-2">
      <TimeSelect setBlocksPickError={setBlocksPickError} />
      <Form blocksPickError={blocksPickError} />
    </div>
  );
};

export default Reserve;
