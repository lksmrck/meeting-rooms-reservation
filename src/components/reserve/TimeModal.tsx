import React, { useContext } from "react";
import Select from "../layout/Select";
import { rooms } from "../../common/dummyData";
import Backdrop from "../layout/Backdrop";
import Button from "../layout/MyButton";
import AppContext from "../../state/AppContext";

const TimeModal: React.FC = () => {
  const appContext = useContext(AppContext);
  return (
    <Backdrop>
      <div className="flex justify-center">
        <form className=" bg-white w-60 ">
          <Select name="rooms" id="rooms" options={rooms} checkbox />
          <Button text="Submit" type="submit" />
          <Button text="Back" onClick={() => appContext?.setOpenModal(false)} />
        </form>
      </div>
    </Backdrop>
  );
};

export default TimeModal;
