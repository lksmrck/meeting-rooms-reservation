import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useContext, useState } from "react";
import AppContext from "../state/AppContext";
import { Meeting } from "../types/types";
import AuthContext from "../state/AuthContext";

export const useRemoveMeeting = () => {
  const { setError } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const removeData = async (
    clickedMeeting: Meeting,
    roomNo: string
  ): Promise<void> => {
    setIsLoading(true);
    const dbRef = doc(db, `companies/${user!.company}/rooms`, String(roomNo));
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
