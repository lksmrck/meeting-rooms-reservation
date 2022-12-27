import { useState, FC } from "react";
import { timeDataCalc } from "../../utils/timeDataCalc";
import { Meeting } from "../../types/types";

type DetailDomProps = {
  clickedMeeting: Meeting;
};

const DetailDom: FC<DetailDomProps> = ({ clickedMeeting }) => {
  const [timeDetail, setTimeDetail] = useState(timeDataCalc(clickedMeeting));

  const { name, type, creator, guests } = clickedMeeting;
  const { start, end, meetingLength } = timeDetail;

  return (
    <section className="grid grid-cols-2">
      <div className="[&>*] font-bold">
        <h3>Meeting name: </h3>
        <h4>Meeting type: </h4>
        <h5>Created by: </h5>
        <h5>Guests:</h5>
        <h5 className="mt-0.5">Start time: </h5>
        <h5 className="mt-0.5">End time: </h5>
        <h5 className="mt-0.5"> Hours duration: </h5>
      </div>
      <div>
        <h3>{name}</h3>
        <h3>{type}</h3>
        <h3>{creator}</h3>
        <h3>
          {guests.length > 0
            ? guests.length > 1
              ? `Meeting has ${guests.length} guests`
              : `Meeting has ${guests.length} guest`
            : "No guests"}
        </h3>
        <h3 className="mt-0.5">{start}</h3>
        <h3 className="mt-0.5">{end}</h3>
        <h3 className="mt-0.5">{meetingLength}</h3>
      </div>
    </section>
  );
};

export default DetailDom;
