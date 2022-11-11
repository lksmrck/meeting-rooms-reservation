import React, { useContext } from "react";
import Form from "./Form";
import AppContext from "../../state/AppContext";
import TimeSelect from "./TimeSelect";

const Reserve = () => {
  /*  const appContext = useContext(AppContext) */ /* return <>{appContext?.openModal ? <TimeModal /> : <Form />}</>; */
  return (
    <div className="flex justify-center h-full bg-gradient-to-r from-violet-300 to-violet-400 [&>*]:m-2">
      <TimeSelect />
      <Form />
    </div>
  );
};

export default Reserve;
