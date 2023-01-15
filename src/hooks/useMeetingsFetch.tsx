import { Dispatch, SetStateAction, useContext, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Meeting } from "../types/types";
import AppContext from "../state/AppContext";
import AuthContext from "../state/AuthContext";

//Detail meetingů v daném vybraném dnu.
export const useMeetingsFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setError } = useContext(AppContext);
  const { user } = useContext(AuthContext);

  const fetchMeetings = async (
    date: string | null,
    setState: Dispatch<SetStateAction<Meeting[]>>,
    roomId: string
  ): Promise<Meeting[]> => {
    setIsLoading(true);
    const docRef = doc(db, `companies/${user!.company}/rooms`, String(roomId));

    const docSnap = await getDoc(docRef);

    let todaysMeetings: Meeting[] = [];
    if (docSnap.exists()) {
      docSnap.data().meetings.forEach((meeting: Meeting) => {
        if (meeting.date == date) todaysMeetings.push(meeting);
      });
      setState(todaysMeetings);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setError({
        error: true,
        message: "Something went wrong during the meetings fetching.",
      });
    }
    return todaysMeetings;
  };
  return { fetchMeetings, isLoading };
};
