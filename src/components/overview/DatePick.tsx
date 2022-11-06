import React, { useState, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ReservationContext from "../../state/ReservationContext";
import { useNavigate } from "react-router-dom";

const DatePick = () => {
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const reservationContext = useContext(ReservationContext);
  if (!reservationContext) return null;
  const { setPickedDate } = reservationContext;

  const pickDateHandler = (date: Date) => {
    //State ke controllingu component value
    setDate(date);
    //Date to string bez mezer --> pro porovnání s datem z FIrebase v DailyOverview componentu
    const adjustedDate = date.toLocaleDateString().replace(/\s/g, "");
    setPickedDate(adjustedDate);
    navigate("/overview");
  };

  return (
    <div className="flex justify-center w-64 ">
      <Calendar onChange={pickDateHandler} value={date} />
    </div>
  );
};

export default DatePick;
