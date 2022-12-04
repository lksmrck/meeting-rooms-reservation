import { Dispatch, SetStateAction, useContext, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Meeting } from "../types/types";
import AppContext from "../state/AppContext";

//Detail meetingů v daném vybraném dnu.
export const useMeetingsFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setError } = useContext(AppContext);

  const fetchMeetings = async (
    company: string,
    date: string | null,
    setState: Dispatch<SetStateAction<Meeting[]>>,
    room: number
  ) => {
    setIsLoading(true);
    const docRef = doc(db, `companies/${company}/rooms`, String(room));
    const docSnap = await getDoc(docRef);

    let todaysMeetings: Meeting[] = [];
    if (docSnap.exists()) {
      docSnap.data().meetings.forEach((meeting: Meeting) => {
        if (meeting.date == date) todaysMeetings.push(meeting);
      });
      setState(todaysMeetings);

      console.log(todaysMeetings);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setError({
        error: true,
        message: "Something went wrong during downloading meetings.",
      });
    }
  };
  return { fetchMeetings, isLoading };
};
