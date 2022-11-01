import { useState } from "react";
import DatePick from "./DatePick";
import { HiArrowDownCircle } from "react-icons/hi2";

import { IconButton } from "@material-ui/core";

const Overview = () => {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className="flex justify-center">
      <div>
        {showCalendar ? (
          <DatePick />
        ) : (
          <IconButton onClick={() => setShowCalendar(true)}>
            <HiArrowDownCircle size={60} style={{ color: "purple" }} />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default Overview;
