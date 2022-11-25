import React, { useState } from "react";
import { timeDataCalc } from "../../utils/timeDataCalc";

type DetailDomProps = {
  clickedMeeting: any;
};

const DetailDom: React.FC<DetailDomProps> = ({ clickedMeeting }) => {
  const [timeDetail, setTimeDetail] = useState(timeDataCalc(clickedMeeting));

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
        <h3>{clickedMeeting.name}</h3>
        <h3>{clickedMeeting.type}</h3>
        <h3>{clickedMeeting.creator}</h3>
        <h3>
          {clickedMeeting.guests.length > 0
            ? clickedMeeting.guests.length > 1
              ? `Meeting has ${clickedMeeting.guests.length} guests`
              : `Meeting has ${clickedMeeting.guests.length} guest`
            : "No guests"}
        </h3>
        <h3 className="mt-0.5">{timeDetail.start}</h3>
        <h3 className="mt-0.5">{timeDetail.end}</h3>
        <h3 className="mt-0.5">{timeDetail.meetingLength}</h3>
      </div>
    </section>
  );
};

export default DetailDom;
