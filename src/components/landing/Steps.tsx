import { useState } from "react";
import { Button } from "@chakra-ui/react";
import CR from "../../assets/CR.jpeg";

const buttonsArray = [
  { id: 1, clicked: true, text: "Log In" },
  { id: 2, clicked: false, text: "See free room" },
  { id: 3, clicked: false, text: "Book it" },
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
    <div className="h-3/4 flex justify-center bg-slate-300 items-center ">
      <div className="h-96 flex items-center">
        <img src={CR} width="100px" height="100px" />
        <p>{buttons[0].clicked ? "kliknuto 1" : ""}</p>
        <p>{buttons[1].clicked ? "kliknuto 2" : ""}</p>
        <p>{buttons[2].clicked ? "kliknuto 3" : ""}</p>
      </div>
      <div className="h-96 flex flex-col my-24 justify-center">
        {buttons.map((button) => {
          return (
            <div className="flex justify-start items-center">
              <Button
                colorScheme="teal"
                onClick={() => onClickButton(button.id)}
                style={{
                  backgroundColor: buttons[button.id - 1].clicked ? "blue" : "",
                }}
              >
                {button.id}
              </Button>
              <p>{button.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Steps;

/* bgColor={buttons[button.id - 1].clicked ? "blue" : ""} */
