import { useState, forwardRef } from "react";
import { Button } from "@chakra-ui/react";
import { stepsButtons } from "../../data/data";

const Steps = forwardRef<HTMLDivElement>((props, ref) => {
  const [buttons, setButtons] = useState(stepsButtons);
  const [clickedButton, setClickedButton] = useState(stepsButtons[0]);

  const onClickButton = (id: number): void => {
    const newButtons = buttons.map((button) =>
      button.id == id
        ? { ...button, clicked: true }
        : { ...button, clicked: false }
    );
    setButtons(newButtons);

    const newClickedButton = buttons.find((button) => button.id == id);
    console.log(newClickedButton);

    if (!newClickedButton) return;
    setClickedButton(newClickedButton);
  };

  return (
    <div
      className="h-3/4 flex justify-center bg-cover bg-center bg-no-repeat bg-stepsWaves items-center  "
      ref={ref}
    >
      <div className="flex mt-24 mx-4 w-full justify-center   ">
        <div className="h-96 flex items-center">
          <img
            src={clickedButton.image}
            width="190px"
            height="350px"
            className="rounded-lg mr-5"
          />
        </div>
        <div className="h-96 flex flex-col justify-center w-80 relative border">
          {buttons.map((button) => {
            return (
              <div className="flex justify-start items-center m-1 ">
                {/*  {button.clicked && (
                  <img
                    src={button.image}
                    width="190px"
                    height="350px"
                    className="rounded-lg mr-5 absolute left-2 top-36"
                  />
                )} */}
                <Button
                  colorScheme="teal"
                  onClick={() => onClickButton(button.id)}
                  style={{
                    backgroundColor: buttons[button.id - 1].clicked
                      ? "#461c70"
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
