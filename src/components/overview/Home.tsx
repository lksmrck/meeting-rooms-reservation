import { useState } from "react";
import DatePick from "./DatePick";
import { IconButton } from "@chakra-ui/react";
import { AiOutlineArrowDown } from "react-icons/ai";

const Overview = () => {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className="flex justify-center items-center  h-screen">
      <div className="mb-32">
        {showCalendar ? (
          <DatePick />
        ) : (
          <IconButton
            colorScheme="purple"
            aria-label="arrow"
            icon={<AiOutlineArrowDown size={30} style={{ color: "white" }} />}
            onClick={() => setShowCalendar(true)}
            className="animate-bounce"
            size="lg"
          />
        )}
      </div>
    </div>
  );
};

export default Overview;
