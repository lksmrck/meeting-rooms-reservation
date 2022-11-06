import { useState } from "react";
import DatePick from "./DatePick";
import { IconButton } from "@chakra-ui/react";
import { AiOutlineArrowDown } from "react-icons/ai";

const Overview = () => {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className="flex justify-center">
      <div>
        {showCalendar ? (
          <DatePick />
        ) : (
          <IconButton
            colorScheme="purple"
            aria-label="arrow"
            icon={<AiOutlineArrowDown size={30} style={{ color: "white" }} />}
            onClick={() => setShowCalendar(true)}
          />
        )}
      </div>
    </div>
  );
};

export default Overview;
