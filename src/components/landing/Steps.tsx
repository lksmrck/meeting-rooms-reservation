import { useState } from "react";
import Button from "../layout/Button";
import CR from "../../assets/CR.jpeg";

const buttonsArray = [
  { id: 1, clicked: false },
  { id: 2, clicked: false },
  { id: 3, clicked: false },
];

const Steps = () => {
  const [buttons, setButtons] = useState(buttonsArray);

  const onClickButton = (id: number): void => {
    const newButtons = buttons.map((button) =>
      button.id == id
        ? { ...button, clicked: true }
        : { ...button, clicked: false }
    );
    setButtons(newButtons);
    console.log(id);
  };

  return (
    <div className="h-96 flex justify-center bg-slate-300">
      <div className="h-96">
        <img src={CR} width="100px" height="100px" />
        <p>{buttons[0].clicked ? "kliknuto 1" : ""}</p>
        <p>{buttons[1].clicked ? "kliknuto 2" : ""}</p>
        <p>{buttons[2].clicked ? "kliknuto 3" : ""}</p>
      </div>
      <div className="h-96 flex flex-col">
        {buttons.map((button) => {
          return (
            <Button
              text={button.id}
              onClick={() => onClickButton(button.id)}
              //Pokud je tlačítko kliknuto, změní se bgcolor
              additionalStyle={
                buttons[button.id - 1].clicked ? "bg-emerald-600" : ""
              }
            />
          );
        })}
      </div>
    </div>
  );
};
export default Steps;
