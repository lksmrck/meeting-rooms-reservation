import { useState, forwardRef } from "react";
import { Button } from "@chakra-ui/react";
import CR from "../../assets/CR.jpeg";
import { stepsButtons } from "../../data/data";

const Steps = forwardRef<HTMLDivElement>((props, ref) => {
  const [buttons, setButtons] = useState(stepsButtons);

  const onClickButton = (id: number): void => {
    const newButtons = buttons.map((button) =>
      button.id == id
        ? { ...button, clicked: true }
        : { ...button, clicked: false }
    );
    setButtons(newButtons);
  };

  return (
    <div
      className="h-3/4 flex justify-center bg-cover bg-center bg-no-repeat bg-stepsWaves items-center "
      ref={ref}
    >
      <div className="flex mt-24 mx-4">
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
        <div className="h-96 flex flex-col justify-center">
          {buttons.map((button) => {
            return (
              <div className="flex justify-start items-center m-1">
                <Button
                  colorScheme="teal"
                  onClick={() => onClickButton(button.id)}
                  style={{
                    backgroundColor: buttons[button.id - 1].clicked
                      ? "blue"
                      : "",
                  }}
                >
                  {button.id}
                </Button>
                <p className=" ml-3 font-solid text-base md:text-lg">
                  {button.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
export default Steps;
