import React from "react";
import { Calendar as ReactCalendar } from "react-calendar";
import "./Calendar.css";

type CalendarProps = {
  onChange: any;
  value: Date;
};

const Calendar: React.FC<CalendarProps> = ({ onChange, value }) => {
  return (
    <div className="w-80">
      <ReactCalendar onChange={onChange} value={value} />
    </div>
  );
};

export default Calendar;
