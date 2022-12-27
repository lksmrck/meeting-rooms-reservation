import { useContext, FC } from "react";
import DatePick from "./DatePick";
import { IconButton } from "@chakra-ui/react";
import { AiOutlineArrowDown } from "react-icons/ai";
import AppContext from "../../state/AppContext";

const Home: FC = () => {
  const { calendarOpen, setCalendarOpen } = useContext(AppContext);

  return (
    <div className="flex justify-center items-center h-content bg-gradient-to-r from-violet-100 to-violet-200 ">
      {calendarOpen ? (
        <DatePick />
      ) : (
        <div className="flex flex-col justify-center items-center mb-32 w-80 lg:w-full">
          <div className="text-xl lg:text-3xl mb-10 font-solid">
            <h1 className=" text-center mb-3">Welcome to Room Reserver</h1>
            <h2 className=" text-center">
              Continue by opening the calendar by button below
            </h2>
          </div>
          <IconButton
            colorScheme="purple"
            aria-label="arrow"
            icon={<AiOutlineArrowDown size={30} style={{ color: "white" }} />}
            onClick={() => setCalendarOpen(true)}
            className="animate-bounce w-52"
            size="lg"
          />
        </div>
      )}
    </div>
  );
};

export default Home;
