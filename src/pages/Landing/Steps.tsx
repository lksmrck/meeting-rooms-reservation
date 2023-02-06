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
      className=" flex justify-center bg-cover bg-center bg-no-repeat bg-stepsWaves items-center w-screen md:py-10  "
      ref={ref}
    >
      <div className="flex mt-30 mx-4 w-full justify-center">
        <div className="h-96 flex md:mb-6 flex-col justify-center items-center w-full mr-10 ">
          <ClickMeArrow />

          {buttons.map((button) => {
            return (
              <div
                key={button.id}
                className="flex justify-center items-center m-1 md:w-155 w-80  "
              >
                <div className="flex justify-end w-1/3 mr-10 font-outline text-4xl font-bold relative  h-10 ">
                  {button.clicked && button.id < 6 ? (
                    <p>{button.followingText}</p>
                  ) : (
                    button.clicked && (
                      <img
                        src={button.followingText}
                        width="80px"
                        className="absolute top-0 right-0"
                      />
                    )
                  )}
                </div>
                <div className="flex justify-start w-2/3 h-10">
                  <Button
                    colorScheme="teal"
                    onClick={() => onClickButton(button.id)}
                    style={{
                      backgroundColor: button.clicked ? "#461c70" : "",
                    }}
                  >
                    {button.id}
                  </Button>
                  <p className=" ml-3 font-solid text-base md:text-lg self-center">
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
