import React, { useContext } from "react";
import Form from "./Form";
import TimeModal from "./TimeModal";
import AppContext from "../../state/AppContext";
import TimeSelect from "./TimeSelect";

const Reserve = () => {
  const appContext = useContext(AppContext);

  /* return <>{appContext?.openModal ? <TimeModal /> : <Form />}</>; */
  return (
    <div className="flex">
      <TimeSelect />
      <Form />
    </div>
  );
};

export default Reserve;
