import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useContext, useState } from "react";
import AppContext from "../../state/AppContext";
import { Meeting } from "../../types/types";

//Detail meetingů v daném vybraném dnu.
export const useRemoveMeeting = () => {
  const { setError } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  const removeData = async (
    company: string,
    clickedMeeting: Meeting,
    room: number
  ) => {
    setIsLoading(true);
    const dbRef = doc(db, `companies/${company}/rooms`, String(room));
    const docSnap = await getDoc(dbRef);

    let updatedMeetings: Meeting[] = [];
    if (docSnap.exists()) {
      await docSnap.data().meetings.forEach((meeting: Meeting) => {
        if (meeting.id !== clickedMeeting.id) updatedMeetings.push(meeting);
      });

      await updateDoc(dbRef, {
        meetings: updatedMeetings,
      });
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setError({
        error: true,
        message: "Something went wrong during deleting meeting.",
      });
    }
  };
  return { removeData, isLoading };
};
