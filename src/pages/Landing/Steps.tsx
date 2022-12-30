import { useState, forwardRef } from "react";
import { Button } from "@chakra-ui/react";
import { stepsButtons } from "../../data/data";
import ClickMeArrow from "../../components/landing/ClickMeArrow";

const Steps = forwardRef<HTMLDivElement>((props, ref) => {
  const [buttons, setButtons] = useState(stepsButtons);

  const onClickButton = (id: number): void => {
    const newButtons = buttons.map((button) =>
      button.id <= id
        ? { ...button, clicked: true }
        : { ...button, clicked: false }
    );
    setButtons(newButtons);
  };

  return (
    <div
      className="h-3/4 flex justify-center bg-cover bg-center bg-no-repeat bg-stepsWaves items-center  "
      ref={ref}
    >
      <div className="flex mt-30 mx-4 w-full justify-center">
        <div className="h-96 flex flex-col justify-center items-center w-screen  ">
          <ClickMeArrow />
          {buttons.map((button) => {
            return (
              <div className="flex justify-center items-center m-1 w-155   ">
                <div className="text-end w-1/3 mr-10 font-outline text-4xl font-bold ">
                  {button.clicked && <p>{button.followingText}</p>}
                </div>
                <div className="flex justify-start w-2/3">
                  <Button
                    colorScheme="teal"
                    onClick={() => onClickButton(button.id)}
                    style={{
                      backgroundColor: button.clicked ? "#461c70" : "",
                    }}
                  >
                    {button.id}
                  </Button>
                  <p className=" ml-3 font-solid text-base md:text-lg">
                    {button.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
export default Steps;
