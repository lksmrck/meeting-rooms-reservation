import React, { useContext, useState } from "react";
import AppContext from "../../state/AppContext";
import { rooms } from "../../common/dummyData";

type SelectProps = {
  /*   checkbox?: boolean; */
  name?: string;
  id?: string;
  options?: any;
};

const Select: React.FC<SelectProps> = ({
  /* checkbox, */ name,
  id,
  options,
}) => {
  const appContext = useContext(AppContext);
  /*  const [selectedRoom, setSelectedRoom] = useState<any>(); */
  if (!appContext) return null;
  const { selectedRoom, setSelectedRoom } = appContext;

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const roomNumber = parseInt(e.target.value);
    const room = rooms.find((option: any) => option.id == roomNumber);

    setSelectedRoom(room);
  };
  const onChangeSelectCheckbox = () => {};

  //V případě checkbox props vrátí Select s checkboxem (použito pro vybírání časových bloků pro rezervace), jinak bez checkboxu (výběr místnosti). Ve Formu použity obě možnosti.
  /*  {
    if (checkbox) {
      return (
        <div>
          {selectedRoom.roomData.map((data: any) => {
            return !data.reserved ? (
              <div>
                <input type="checkbox" id={id} name={data.time} />
                <label htmlFor={data.time}>{data.time}</label>{" "}
              </div>
            ) : (
              ""
            );
          })}
        </div>
      );
    } else */ {
    return (
      <select name={name} id={id} className="m-2" onChange={onChangeSelect}>
        {options.map((option: any) => {
          return <option value={option.id}>{option.name}</option>;
        })}
      </select>
    );
  }
};
/* }; */

export default Select;
