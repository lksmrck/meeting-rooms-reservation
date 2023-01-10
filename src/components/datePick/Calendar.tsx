import { FC } from "react";
import { Calendar as ReactCalendar } from "react-calendar";
import "./Calendar.css";

type CalendarProps = {
  onChange: (date: Date) => void;
  value: Date;
};

const Calendar: FC<CalendarProps> = ({ onChange, value }) => {
  return (
    <div className="w-80">
      <ReactCalendar onChange={onChange} value={value} />
    </div>
  );
};

export default Calendar;
