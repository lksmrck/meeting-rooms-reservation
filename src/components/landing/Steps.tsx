import { useState } from "react";
import { Button } from "@chakra-ui/react";
import CR from "../../assets/CR.jpeg";

const buttonsArray = [
  { id: 1, clicked: true, text: "Log In" },
  { id: 2, clicked: false, text: "See all company rooms" },
  { id: 3, clicked: false, text: "Pick a room" },
  { id: 4, clicked: false, text: "Pick a time and book it" },
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
  };

  return (
    <div className="h-3/4 flex justify-center bg-cover  bg-center bg-no-repeat bg-stepsWaves items-center ">
      <div className="h-96 flex items-center">
        <img
          src={CR}
          width="190px"
          height="350px"
          className="rounded-lg mr-5"
        />
        <p>{buttons[0].clicked ? "kliknuto 1" : ""}</p>
        <p>{buttons[1].clicked ? "kliknuto 2" : ""}</p>
        <p>{buttons[2].clicked ? "kliknuto 3" : ""}</p>
      </div>
      <div className="h-96 flex flex-col my-24 justify-center">
        {buttons.map((button) => {
          return (
            <div className="flex justify-start items-center m-1">
              <Button
                colorScheme="teal"
                onClick={() => onClickButton(button.id)}
                style={{
                  backgroundColor: buttons[button.id - 1].clicked ? "blue" : "",
                }}
              >
                {button.id}
              </Button>
              <p className=" ml-3">{button.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Steps;
