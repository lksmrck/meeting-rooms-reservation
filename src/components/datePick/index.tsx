import { useState } from "react";
import DatePick from "./DatePick";
import { IconButton } from "@chakra-ui/react";
import { AiOutlineArrowDown } from "react-icons/ai";

const Overview = () => {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className="flex justify-center items-center h-content bg-gradient-to-r from-violet-100 to-violet-200 ">
      {showCalendar ? (
        <DatePick />
      ) : (
        <div className="flex flex-col justify-center items-center mb-32 w-80 lg:w-full">
          <h1 className="text-md lg:text-xl mb-10">
            Welcome to Room Reserver. Continue by opening the calendar by button
            below.
          </h1>
          <IconButton
            colorScheme="purple"
            aria-label="arrow"
            icon={<AiOutlineArrowDown size={30} style={{ color: "white" }} />}
            onClick={() => setShowCalendar(true)}
            className="animate-bounce w-52"
            size="lg"
          />
        </div>
      )}
    </div>
  );
};

export default Overview;
